// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  const handleFileNameChange = (event) => {
    // Обработчик изменения названия файла
    const newFileName = event.target.innerText;
    // Вы можете сохранять новое название файла в состояние или выполнять другие действия
  };

  return (
    <header className="app-header">
      <img src="/path/to/your/image.png" alt="Logo" />
      <h1
        contentEditable
        onBlur={handleFileNameChange}
        suppressContentEditableWarning={true}
      >
        Название вашего файла
      </h1>
      <div className="header-buttons">
        <button>Файл</button>
        <button>Правка</button>
        <button>Справка</button>
      </div>
      {/* Другие элементы заголовка, такие как навигация и т. д. */}
    </header>
  );
};

export default Header;
