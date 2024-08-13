"use client";

import React from 'react';
import Link from 'next/link';
import './globals.css'; // Ensure this path matches the location of your globals.css

const BlankPage: React.FC = () => {
  return (
    <div className="blank-page-container">
      <h1>Blank Page</h1>
      <p>This is your new blank page.</p>
      <Link href="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default BlankPage;
