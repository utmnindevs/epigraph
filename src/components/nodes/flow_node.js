import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import './nodes_css/flow_node_css.css'

function RightHandler({ handleId, iId }) {

    return (
      <>
        <div className='flow-node__out-handles'>
          <div>{handleId}</div>
          <Handle type="source" position={Position.Right} id={handleId} style={{ top: 20 * iId + 50 }} isConnectable={1} />
        </div>
  
      </>
    );
  
  }

function FlowNode({ data }) {
    const onChange = useCallback((evt) => {
      console.log(evt.target.value);
    }, []);
    // console.log(data.counts_in);
  
    return (
      <>
        <div className="flow-node">
          <div className="flow_header">
            <label htmlFor="text"> Из <strong>{data.source}</strong> в <strong>{data.target}</strong></label>
  
          </div>
          <div className="flow_body">
            <div className="flow_outhandles">
  
              {Array.from({ length: data.counts_handles['handle_out'] }, (_, i) => {
                const handleId = `out_${i}`;
                return (
                  <RightHandler handleId={handleId} iId={i} />
                );
              })}
            </div>
          </div>
        </div>
  
  
      </>
    );
  }
  
  
  export default FlowNode;