import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
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
  node_data,
  nodes,
  setNodes,
  ...props
}) {

  const [nodeName, setNodeName] = useState(node_data.name);
  const [nodeIns, setNodeIns] = useState(node_data.counts_handles['handle_in']);
  const [nodeOuts, setNodeOuts] = useState(node_data.counts_handles['handle_out']);
  const [nodePopulation, setNodePopulation] = useState(node_data.population);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            name: nodeName,
            counts_handles: {'handle_in': nodeIns, 'handle_out': nodeOuts},
            population: nodePopulation,
          };
        }

        return node;
      })
    );
  }, [nodeName, nodeIns, nodePopulation, nodeOuts, setNodes]);
  
  return (
    <div
      className="context-proporties-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>Выбранный компартмент: 
          <hr></hr>
          

        <div className="context-proporties-menu">
          <label>name:</label>
          <input type='text' id="input_nodename" defaultValue={node_data.name} onChange={(event) => setNodeName(event.target.value)}></input>

          <label>ins:</label>
          <input type='number' id="input_nodename" defaultValue={node_data.counts_handles['handle_in']} onChange={(event) => setNodeIns(event.target.value)}></input>

          <label>outs:</label>
          <input type='number' id="input_nodename" defaultValue={node_data.counts_handles['handle_out']} onChange={(event) => setNodeOuts(event.target.value)}></input>

          <label>population:</label>
          <input type='number' id="input_nodename" defaultValue={node_data.population} onChange={(event) => setNodePopulation(event.target.value)}></input>
        </div>
        </small>
      </p>
    </div>
  );
}
