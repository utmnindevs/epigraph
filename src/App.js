// App.js

import Header from './header/Header';

import React, { useState, useRef, useCallback } from 'react';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
} from 'reactflow';
import ReactFlowJsonObject from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import CompartmentNode from './components/nodes/compartment_node';
import FlowNode from './components/nodes/flow_node';

import CompartmentFlowEdge from './components/edges/compartmentFlowEdge';

import * as Contexts from './components/handlers/context_menu';

import './index.css';
import './reactflow-workflow.css'


import CompartmentsToJsonFormat from "./helpers/export_json"

const edgeTypes = {
  compartmentFlowEdge: CompartmentFlowEdge,
};



let comp_id = 0;
let flow_id = 0;
const getCompartmentId = () => `compartment_${comp_id++}`;
const getFlowId = () => `flow_${flow_id++}`;

const nodeTypes = { compartmentNode: CompartmentNode, flowNode: FlowNode };

const App = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rfInstance, setRfInstance] = useState(null); //to save

  const [menu, setMenu] = useState(null);
  const [proporties, setProporties] = useState(null);
  
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({...params, type:'compartmentFlowEdge'}, eds)),
    [],
  );

  localStorage.clear(); // get api to server get current user and load data if exist

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
      
      
      console.log(type);

      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });


      if(type === 'compartmentNode'){
        const newCompartment = {
          id: getCompartmentId(),
          type,
          position,
          data: {
            name,
            counts_handles: {
              'handle_in': 1,
              'handle_out': 2,
            }, 
            population: 0,
          },
        };
        setNodes((nds) => nds.concat(newCompartment));
        return;
      }

      if(type === 'flowNode'){
        const newFlow = {
          id: getFlowId(),
          type,
          position,
          data: {
            name,
            counts_handles: {
              'handle_in': 1,
              'handle_out': 2,
            }, 
            sfactor: {
              "name": "β",
              "value": 0.1,
            },
            target: {
              "names": ['out_0','out_1'],
              "coefs": [0.4, 0.6]
            },
            source: "in_0"
          },
        };
        setNodes((nds) => nds.concat(newFlow));
        return;
      }

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
      if(node.type === 'compartmentNode' || 'flowNode' ){
        event.preventDefault();
        console.log("hey im clicked!", node.data.name);
        setProporties({
          id: node.id,
          node_data: node.data,
          nodes: nodes,
          setNodes: setNodes,
        });
      }
      
    },
    [setProporties],
  )

  const onPaneClick = useCallback(() => {setMenu(null); setProporties(null);}, [setMenu, setProporties]);

  return (
    <><div className="app-container"> {/* Можно добавить стили для основного контейнера */}
      <Header rfInstance={reactFlowInstance} />
      
      
      {<div className="providerflow">
      <ReactFlowProvider>
      {proporties && <Contexts.ContextProportiesMenu {...proporties} />}

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
            edgeTypes={edgeTypes}
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
        
      </ReactFlowProvider>
    </div>}
   
      
    </div></>



  );
};

export default App;
