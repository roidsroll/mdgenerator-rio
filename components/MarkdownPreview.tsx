
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-invert max-w-none prose-headings:text-teal-400 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-gray-100 prose-code:bg-gray-700 prose-code:px-1.5 prose-code:py-1 prose-code:rounded"
      remarkPlugins={[remarkGfm]}
      components={{
        // FIX: Use `any` for props to resolve TypeScript errors related to `react-markdown` component props.
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              // FIX: Cast style to `any` to resolve type mismatch with `react-syntax-highlighter`.
              style={vscDarkPlus as any}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownPreview;