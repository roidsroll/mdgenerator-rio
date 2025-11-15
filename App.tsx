
import React from 'react';
import Header from './components/Header';
import MarkdownEditor from './components/MarkdownEditor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MarkdownEditor />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Dibuat oleh Rio Puji Nugroho</p>
      </footer>
    </div>
  );
};

export default App;
