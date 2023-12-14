import React from 'react';

import { useStore } from 'reactflow';

const transformSelector = (state) => state.transform;

export default () => {
  const transform = useStore(transformSelector);

  const onDragStart = (event, nodeType, compartment_name) => {
    var data_of_node = {
      type: nodeType,
      name: compartment_name,
    }
    console.log(data_of_node);

    event.dataTransfer.setData('application/reactflow', JSON.stringify(data_of_node));
    event.dataTransfer.effectAllowed = 'move';
  };

  var compartment_name = "Безымянный";
  

  const onEnterPressed = (event) => {
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(event.target.value)
    if (event.key === 'Enter' && event.target.value !== '' && !hasSpecialCharacters) 
    {
      compartment_name = event.target.value;
      console.log('Введенное значение:', compartment_name);
    } 

  };

  const onCheckSymbolsandNum = (event) => {
    const hasSpecialCharacters = /[!@#$%^/\\\-=+\_&*(),.?":{}|<>]/.test(event.target.value)
    const hasNumbers = /[0-9]/.test(event.target.value)
    if(hasSpecialCharacters || hasNumbers) 
    {
      var user_input = event.target.value
      document.getElementById("comparment_input_text").value = user_input.slice(0,-1)
    } 

  };


  return (
    <aside>
      <div className="title">Zoom & pan transform</div>
      <div className="transform">
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
      <div className="description">Напишите название компартмента.</div>
      <div>
        <label htmlFor="text">Имя:</label>
        <input id="comparment_input_text"  onKeyDown={(event) => onEnterPressed(event)} maxlength="20" onChange={(event) => onCheckSymbolsandNum(event)}/> 
        {/* TODO: нужна реакция на Enter. */}
      </div>
      <div className="dndnode compartmentNode" onDragStart={(event) => onDragStart(event, 'compartmentNode', compartment_name)} draggable>
        Compartment node
      </div>
    </aside>
  );
};
