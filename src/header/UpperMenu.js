// UpperMenu.js
import React, { useState, useRef, useCallback } from 'react';
import './header_css/UpperMenu.css';
import CompartmentsToJsonFormat from "../helpers/export_json"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import 'bootstrap/dist/css/bootstrap.min.css'

const UpperMenu = ({ rfInstance }) => {
  const [fileName, setFileName] = useState("Untitled");

  const handleFileNameChange = (event) => {
    setFileName(event.target.innerText);
  };

  const onDownloadJson = useCallback(() => {
    const saveStateAndDownload = async () => {
      if (rfInstance) {
        localStorage.setItem("nodes", JSON.stringify(rfInstance.getNodes()));


        const nodes = JSON.parse(localStorage.getItem("nodes")) || [];
        var compartments_nodes = CompartmentsToJsonFormat(nodes);

        const element = document.createElement("a");
        const textFile = new Blob(["{\"Compartments\": [" + compartments_nodes.join(",") + "]}"], { type: 'application/json' }); //так плохо делать, но пока костыльно
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


  function FileMenuDropDown(params) {
    return (
      <Dropdown>
      <Dropdown.Toggle as={CustomToggle}  id="dropdown-custom-components">
        {params.name}
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        <Dropdown.Item onClick={onDownloadJson}>Экспорт JSON</Dropdown.Item>
  
      </Dropdown.Menu>
    </Dropdown>
    );
  }

  function AboutMenuDropDown(params) {
    return (
      <Dropdown>
      <Dropdown.Toggle as={CustomToggle}  id="dropdown-custom-components">
        {params.name}
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        <Dropdown.Item>Тут могла быть ваша реклама</Dropdown.Item>
  
      </Dropdown.Menu>
    </Dropdown>
    );
  }

  function EditMenuDropDown(params) {
    return (
      <Dropdown>
      <Dropdown.Toggle as={CustomToggle}  id="dropdown-custom-components">
        {params.name}
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        <Dropdown.Item>Лос пенгвинос маласе ласкаре</Dropdown.Item>
  
      </Dropdown.Menu>
    </Dropdown>
    );
  }
  

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
      <div className="header-buttons" >

        <FileMenuDropDown className="hdr-button" name={'Файл'}/>
        <EditMenuDropDown className="hdr-button" name={'Правка'}/>
        <AboutMenuDropDown className="hdr-button" name={'Справка'}/>

      </div>
    </div >
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));


export default UpperMenu;
