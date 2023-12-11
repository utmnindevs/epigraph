// App.js

import Header from './Header';

import React, { useState, useRef, useCallback } from 'react';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import CompartmentNode from './components/nodes/compartment_node';

import './index.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { compartmentNode: CompartmentNode };

const App = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const node_data = event.dataTransfer.getData('application/reactflow');
      var parse_node_data = JSON.parse(node_data);
      var type = parse_node_data.type;
      var name = parse_node_data.name;
      

      if (typeof type  === 'undefined' || !type) {
        return;
      }
      

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { name },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <><div className="app-container"> {/* Можно добавить стили для основного контейнера */}
      <Header />
      
      
      {<div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>}
   
      
    </div></>
      


  );
};

export default App;
