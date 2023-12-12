import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

import "./context_menu.css"

export function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  node_name,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>Компартмент: <b>{node_name}</b></small>
      </p>
      <button onClick={duplicateNode}>Дублировать</button>
      <button onClick={deleteNode}>Удалить</button>
    </div>
  );
}


export function ContextProportiesMenu({
  id,
  node_name,
  ...props
}) {

  return (
    <div
      className="context-proporties-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>Выбранный компартмент: 
          <hr></hr>
        <div className="context-proporites-body">
          <p>Название: <b>{node_name}</b></p>
          <p>Кол-во входных: <b>0</b></p>
          <p>Кол-во выходных: <b>0</b></p>

        </div>
        </small>
      </p>
    </div>
  );
}
