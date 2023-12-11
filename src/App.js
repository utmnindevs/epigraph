// App.js
import React from 'react';
import Header from './Header';
import './App.css'; // Подключаем файл стилей для основного компонента, если необходимо

const App = () => {
  return (
    <div className="app-container"> {/* Можно добавить стили для основного контейнера */}
      <Header />
      {/* Остальное содержимое вашего приложения */}
    </div>
  );
};

export default App;
