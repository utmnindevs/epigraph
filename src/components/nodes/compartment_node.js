import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import './nodes_css/compartment_node_css.css'
 
const handleStyle = { left: 10 };
 
function CompartmentNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='compartment'>
      <Handle type="target" position={Position.Left} />
      <div>
        <label htmlFor="text"> {data.name}</label>
      </div>
      <Handle type="source" position={Position.Right} id="a" />

    </div>
  );
}


export default CompartmentNode;