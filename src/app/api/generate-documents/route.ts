import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    const { name, company } = await request.json();
    
    if (!name || !company) {
      return NextResponse.json(
        { error: 'Name and company are required' },
        { status: 400 }
      );
    }

    // Load the docx file as binary content
    const coverLetterPath = path.join(process.cwd(), 'public', 'Cover Letter.docx');
    const resumePath = path.join(process.cwd(), 'public', 'Resume.pdf');

    // Check if files exist
    if (!fs.existsSync(coverLetterPath)) {
      return NextResponse.json(
        { error: 'Cover Letter template not found' },
        { status: 404 }
      );
    }

    if (!fs.existsSync(resumePath)) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Read the template
    const content = fs.readFileSync(coverLetterPath, 'binary');

    // Create a PizZip instance with the content
    const zip = new PizZip(content);
    
    // Create a Docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Set the template variables
    doc.render({
      Name: name,
      COMPANY: company,
      Company: company, // Adding variations just in case
    });

    // Get the modified document as binary
    const modifiedDoc = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // Create a temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Write the modified document to the temp directory
    const modifiedCoverLetterPath = path.join(tempDir, `Cover_Letter_${name}_${company}.docx`);
    fs.writeFileSync(modifiedCoverLetterPath, modifiedDoc);

    // Read the resume file
    const resumeBuffer = fs.readFileSync(resumePath);

    // Create a new ZIP file
    const zipFile = new JSZip();
    
    // Add files to the ZIP
    // Add the cover letter in DOCX format (client can convert to PDF if needed)
    zipFile.file(`Cover_Letter_${name}_${company}.docx`, modifiedDoc);
    zipFile.file('Resume.pdf', resumeBuffer);
    
    // Generate the ZIP file
    const zipBuffer = await zipFile.generateAsync({ type: 'nodebuffer' });
    
    // Create a temporary file name for the ZIP
    const zipFileName = `${name.replace(/\s+/g, '_')}_${company.replace(/\s+/g, '_')}_Documents.zip`;
    const zipPath = path.join(tempDir, zipFileName);
    
    // Write the ZIP file to disk
    fs.writeFileSync(zipPath, zipBuffer);
    
    // Set headers for the response
    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', `attachment; filename="${zipFileName}"`);
    
    // Create a readable stream from the file
    const fileStream = fs.createReadStream(zipPath);
    
    // Convert the readable stream to a Response
    const response = new Response(fileStream as unknown as ReadableStream);
    
    // Clean up temp files on a timeout
    setTimeout(() => {
      try {
        if (fs.existsSync(modifiedCoverLetterPath)) {
          fs.unlinkSync(modifiedCoverLetterPath);
        }
        if (fs.existsSync(zipPath)) {
          fs.unlinkSync(zipPath);
        }
      } catch (error) {
        console.error('Error cleaning up temp files:', error);
      }
    }, 5000); // Clean up after 5 seconds
    
    // Return the response with headers
    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipFileName}"`,
      }
    });
  } catch (error) {
    console.error('Error generating documents:', error);
    return NextResponse.json(
      { error: 'Failed to generate documents' },
      { status: 500 }
    );
  }
} 