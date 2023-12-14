// UpperMenu.js
import React, { useState, useRef, useCallback } from 'react';
import './header_css/UpperMenu.css';
import CompartmentsToJsonFormat from "../helpers/export_json"


const UpperMenu = ({rfInstance}) => {
  const [fileName, setFileName] = useState("Untitled");

  const handleFileNameChange = (event) => {
    setFileName(event.target.innerText);
  };

  const onDownloadJson = useCallback(() => {
    const saveStateAndDownload = async() => {
      if(rfInstance){
        localStorage.setItem("nodes", JSON.stringify(rfInstance.getNodes()));


        const nodes = JSON.parse(localStorage.getItem("nodes")) || [];
        var compartments_nodes = CompartmentsToJsonFormat(nodes);

        const element = document.createElement("a");
        const textFile = new Blob(["{\"Compartments\": [" + compartments_nodes.join(",") + "]}"], {type: 'application/json'}); //так плохо делать, но пока костыльно
        element.href = URL.createObjectURL(textFile);
        element.download = document.getElementById("title_filename").innerHTML + ".json"; 
        document.body.appendChild(element); 
        element.click();
      }
      

      //api needed here
    };

    saveStateAndDownload();
    // console.log(FormattingJsonCompartment(JSON.parse(localStorage.getItem("nodes"))[0]));

  })

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
      <button onClick={onDownloadJson}>Файл</button>
        <button>Правка</button>
        <button>Справка</button>
      </div>
    </div>
  );
};

export default UpperMenu;
