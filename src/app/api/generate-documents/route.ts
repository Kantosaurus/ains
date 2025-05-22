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

    console.log('Paths:', { 
      coverLetterPath, 
      resumePath,
      cwd: process.cwd()
    });

    // Check if files exist
    if (!fs.existsSync(coverLetterPath)) {
      console.error('Cover Letter template not found at:', coverLetterPath);
      return NextResponse.json(
        { error: 'Cover Letter template not found' },
        { status: 404 }
      );
    }

    if (!fs.existsSync(resumePath)) {
      console.error('Resume not found at:', resumePath);
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    console.log('Files exist, proceeding with document generation');

    try {
      // Read the template
      const content = fs.readFileSync(coverLetterPath, 'binary');

      console.log('Starting document processing with values:', {
        name, 
        company
      });
      
      // Create a PizZip instance with the content
      const zip = new PizZip(content);
      
      // DEBUG: Extract the document content to examine
      const rawText = zip.files['word/document.xml'] ? zip.files['word/document.xml'].asText() : '';
      console.log('Document XML snippet (first 500 chars):', rawText.substring(0, 500));
      console.log('Looking for patterns in document:', {
        containsNameBrackets: rawText.includes('[NAME]'),
        containsCompanyBrackets: rawText.includes('[COMPANY]'),
        containsUndefined: rawText.includes('UNDEFINED')
      });

      // Create a Docxtemplater instance
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '[', end: ']' }
      });

      // Set the template variables - include all possible placeholder formats
      doc.render({
        NAME: name,
        COMPANY: company,
        TO: company,
        UNDEFINED: company
      });

      // For troubleshooting - try another approach with string replacement
      if (zip.files['word/document.xml']) {
        let xmlContent = zip.files['word/document.xml'].asText();
        
        // Function to escape regex special characters
        const escapeRegExp = (string: string): string => {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };
        
        // Manual replacements for various formats - use escaping for safety
        const replacements = [
          { pattern: 'UNDEFINED', replace: company },
          { pattern: 'undefined', replace: company.toLowerCase() },
          { pattern: escapeRegExp('[COMPANY]'), replace: company },
          { pattern: escapeRegExp('[company]'), replace: company.toLowerCase() },
          { pattern: 'TO:', replace: `TO:\n\n${company}` },
          { pattern: escapeRegExp('[NAME]'), replace: name },
          { pattern: escapeRegExp('[name]'), replace: name.toLowerCase() },
          { pattern: 'AINSLEY', replace: name }
        ];
        
        // Apply each replacement and log results
        for (const r of replacements) {
          const regex = new RegExp(r.pattern, 'g');
          const originalContent = xmlContent;
          xmlContent = xmlContent.replace(regex, r.replace);
          
          // Check if any replacements were made
          const replacementsMade = originalContent !== xmlContent;
          console.log(`Replaced "${r.pattern}" with "${r.replace}": ${replacementsMade ? 'Yes' : 'No'}`);
        }
        
        // Put modified content back
        zip.file('word/document.xml', xmlContent);
        
        // Also try replacing in the header and footer files
        const headerFooterFiles = Object.keys(zip.files).filter(
          filename => filename.includes('header') || filename.includes('footer')
        );
        
        console.log('Found header/footer files:', headerFooterFiles);
        
        headerFooterFiles.forEach(filename => {
          if (zip.files[filename]) {
            let content = zip.files[filename].asText();
            for (const r of replacements) {
              content = content.replace(new RegExp(r.pattern, 'g'), r.replace);
            }
            zip.file(filename, content);
          }
        });
      }

      // Get the modified document as binary
      const modifiedDoc = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      console.log('Document template rendered successfully');

      // Create a temp directory if it doesn't exist
      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        console.log('Creating temp directory at:', tempDir);
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Generate safe filenames
      const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
      const safeCompany = company.replace(/[^a-zA-Z0-9]/g, '_');
      
      // Write the modified document to the temp directory
      const modifiedCoverLetterPath = path.join(tempDir, `Cover_Letter_${safeName}_${safeCompany}.docx`);
      fs.writeFileSync(modifiedCoverLetterPath, modifiedDoc);
      console.log('Modified cover letter saved to:', modifiedCoverLetterPath);

      // Read the resume file
      const resumeBuffer = fs.readFileSync(resumePath);
      console.log('Resume file read successfully');

      // Create a new ZIP file
      const zipFile = new JSZip();
      
      // Add files to the ZIP
      zipFile.file(`Cover_Letter_${safeName}_${safeCompany}.docx`, modifiedDoc);
      zipFile.file('Resume.pdf', resumeBuffer);
      
      // Generate the ZIP file
      console.log('Generating ZIP file...');
      const zipBuffer = await zipFile.generateAsync({ type: 'nodebuffer' });
      
      // Create a temporary file name for the ZIP
      const zipFileName = `${safeName}_${safeCompany}_Documents.zip`;
      const zipPath = path.join(tempDir, zipFileName);
      
      // Write the ZIP file to disk
      fs.writeFileSync(zipPath, zipBuffer);
      console.log('ZIP file created at:', zipPath);
      
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
          console.log('Temp files cleaned up');
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
    } catch (innerError: unknown) {
      console.error('Error during document processing:', innerError);
      const errorMessage = innerError instanceof Error ? innerError.message : 'Unknown error occurred';
      throw new Error(`Document processing failed: ${errorMessage}`);
    }
  } catch (error: unknown) {
    console.error('Error generating documents:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Failed to generate documents: ${errorMessage}` },
      { status: 500 }
    );
  }
} 