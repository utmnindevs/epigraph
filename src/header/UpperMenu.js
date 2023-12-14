// UpperMenu.js
import React, { useState } from 'react';
import './header_css/UpperMenu.css';

const UpperMenu = () => {
  const [fileName, setFileName] = useState("Untitled");

  const handleFileNameChange = (event) => {
    setFileName(event.target.innerText);
  };

  return (
    <div className="upper-menu">
      <div className="logo-and-file">
        <img src="Graph_Report.svg" alt="Logo" />
        <h1 id='title_filename'
          contentEditable
          onBlur={handleFileNameChange}
          suppressContentEditableWarning={true}
        >
          {fileName}
        </h1>
      </div>
      <div className="header-buttons">
        <button>Файл</button>
        <button>Правка</button>
        <button>Справка</button>
      </div>
    </div>
  );
};

export default UpperMenu;
