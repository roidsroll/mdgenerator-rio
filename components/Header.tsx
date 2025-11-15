
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fab fa-markdown text-4xl text-teal-400"></i>
          <div>
            <h1 className="text-2xl font-bold text-white">Generator File MD berbasis AI</h1>
            <p className="text-sm text-gray-400">Buat file Markdown profesional untuk proyek Anda dalam hitungan detik.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
