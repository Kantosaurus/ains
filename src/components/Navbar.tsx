'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiDownload } from 'react-icons/fi';
import { 
  Navbar as ResizableNavbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle,
  NavbarButton
} from '@/components/ui/resizable-navbar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/#about' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Resume', link: '/#resume' },
    { name: 'Contact', link: '/#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody>
        <Link href="/" className="relative z-20 flex items-center font-medium text-black dark:text-white">
          <span className="text-xl font-bold">Portfolio</span>
        </Link>
        
        <NavItems items={navItems} />
        
        <div className="relative z-20 ml-auto flex items-center gap-2">
          <NavbarButton 
            href="/#resume"
            variant="primary"
          >
            <FiDownload className="mr-1 h-4 w-4" />
            Resume
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="relative z-20 flex items-center font-medium text-black dark:text-white">
            <span className="text-xl font-bold">Portfolio</span>
          </Link>
          
          <MobileNavToggle isOpen={isOpen} onClick={toggleMenu} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, index) => (
            <Link 
              href={item.link} 
              key={index}
              onClick={() => setIsOpen(false)}
              className="w-full rounded-md px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {item.name}
            </Link>
          ))}
          
          <NavbarButton 
            href="/#resume"
            variant="primary"
            className="mt-2 w-full justify-center"
          >
            <FiDownload className="mr-1 h-4 w-4" />
            Resume
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar; 