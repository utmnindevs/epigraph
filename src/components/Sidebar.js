import React from 'react';


export default () => {
  const onDragStart = (event, nodeType, compartment_name) => {
    var data_of_node = {
      type: nodeType,
      name: compartment_name,
    }
    console.log(data_of_node);

    event.dataTransfer.setData('application/reactflow', JSON.stringify(data_of_node));
    event.dataTransfer.effectAllowed = 'move';
  };

  var compartment_name = "not a name";

  const onEnterPressed = (event) => {
    if (event.key === 'Enter') {
      compartment_name = event.target.value;
      console.log('Введенное значение:', compartment_name);
    }
  };

  return (
    <aside>
      <div className="description">Напишите название компартмента.</div>
      <div>
        <label htmlFor="text">Имя:</label>
        <input id="comparment_input_text"  onKeyDown={(event) => onEnterPressed(event)}/> 
        {/* TODO: нужна реакция на Enter. */}
      </div>
      <div className="dndnode compartmentNode" onDragStart={(event) => onDragStart(event, 'compartmentNode', compartment_name)} draggable>
        Compartment node
      </div>
    </aside>
  );
};
