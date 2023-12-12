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

import * as Contexts from './components/handlers/context_menu';

import './index.css';
import './reactflow-workflow.css'

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { compartmentNode: CompartmentNode };

const App = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [menu, setMenu] = useState(null);
  const [proporties, setProporties] = useState(null);
  
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const ref = useRef(null);

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


      if (typeof type === 'undefined' || !type) {
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
        data: {
          name,
          counts_handles: {
            'handle_in': 1,
            'handle_out': 2,
          }
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );


  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      if(!ref.current) return;
      const pane = ref.current.getBoundingClientRect();
      console.log(pane);
      setMenu({
        id: node.id,
        top: event.clientY < pane.height + 200 && event.clientY,
        left: event.clientX < pane.width + 200 && event.clientX,
        right: event.clientX >= pane.width + 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height + 200 && pane.height - event.clientY,
        node_name: node.data.name,
      });
    },
    [setMenu],
  );

  const onNodeClick = useCallback(
    (event, node) => {
      event.preventDefault();
      console.log("hey im clicked!", node.data.name);
      setProporties({
        id: node.id,
        node_data: node.data,
      });
    },
    [setProporties],
  )

  const onPaneClick = useCallback(() => {setMenu(null); setProporties(null);}, [setMenu, setProporties]);

  return (
    <><div className="app-container"> {/* Можно добавить стили для основного контейнера */}
      <Header />
      
      
      {<div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            ref={ref}


            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}

            onNodeClick={onNodeClick}

            onPaneClick={onPaneClick}
            onNodeContextMenu={onNodeContextMenu}
            fitView
          >
            <Controls />
            <Background variant="dots" gap={12} size={0.8} />

            {menu && <Contexts.ContextMenu onClick={onPaneClick} {...menu} />}
          </ReactFlow>
        </div>
        <Sidebar />
        {proporties && <Contexts.ContextProportiesMenu {...proporties} />}
        
      </ReactFlowProvider>
    </div>}
   
      
    </div></>



  );
};

export default App;
