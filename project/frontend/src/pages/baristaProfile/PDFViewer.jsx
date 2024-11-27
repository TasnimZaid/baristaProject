import React from 'react';

const PDFViewer = ({ fileUrl, title }) => {
  return (
    <div className="pdf-viewer">
      <h3 className="text-xl font-semibold">{title}</h3>
      <a 
        href={`http://localhost:3000/${fileUrl}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        View PDF
      </a>
    </div>
  );
};

export default PDFViewer;
