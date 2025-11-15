
import React from 'react';
import { useState, useCallback } from 'react';
import { generateMarkdown } from '../services/geminiService';
import MarkdownPreview from './MarkdownPreview';
import Loader from './Loader';

const MarkdownEditor: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMarkdown('');

    try {
      const generatedMd = await generateMarkdown(prompt);
      setMarkdown(generatedMd);
    } catch (err) {
      setError('Gagal menghasilkan Markdown. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleCopy = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="flex flex-col space-y-4">
        <label htmlFor="prompt" className="text-lg font-semibold text-gray-300">
          <i className="fas fa-keyboard mr-2 text-teal-400"></i>
          Jelaskan File Markdown yang Anda Inginkan
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Contoh: Buatkan saya file README.md yang bagus untuk proyek React & TypeScript saya yang bernama 'SuperApp'. Jelaskan instalasi, penggunaan, dan cara berkontribusi."
          className="w-full h-64 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-teal-500/30"
        >
          {isLoading ? (
            <>
              <Loader />
              <span>Menghasilkan...</span>
            </>
          ) : (
            <>
              <i className="fas fa-cogs"></i>
              <span>Buat File MD</span>
            </>
          )}
        </button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </div>

      {/* Output Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-300">
            <i className="fas fa-eye mr-2 text-teal-400"></i>
            Pratinjau Hasil
          </h2>
          {markdown && (
            <button
              onClick={handleCopy}
              className="relative bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm"
            >
              {showCopied ? (
                <>
                  <i className="fas fa-check mr-2 text-green-400"></i>
                  Tersalin!
                </>
              ) : (
                <>
                  <i className="fas fa-copy mr-2"></i>
                  Salin Teks Markdown
                </>
              )}
            </button>
          )}
        </div>
        <div className="w-full h-auto min-h-[20rem] p-4 bg-gray-800 border-2 border-gray-700 rounded-lg overflow-y-auto">
          {isLoading ? (
             <div className="flex items-center justify-center h-full text-gray-500">
                <p>AI sedang menulis...</p>
             </div>
          ) : markdown ? (
            <MarkdownPreview content={markdown} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Hasil pratinjau akan muncul di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;