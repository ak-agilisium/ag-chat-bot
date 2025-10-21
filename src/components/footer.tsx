import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground p-4 mt-8 border-t">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Application. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
