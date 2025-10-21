import React from 'react';

const Header = () => {
  return (
    <header className="bg-background text-foreground p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Application</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-primary">Home</a></li>
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
