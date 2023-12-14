import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import './nodes_css/compartment_node_css.css'

const handleStyle = { left: 10 };


function LeftHandler({ handleId, iId }) {

  return (
    <>
      <div className='compartment-node__in-handles'>
        <div>{handleId}</div>
        <Handle type="target" position={Position.Left} id={handleId} style={{ top: 20 * iId + 50 }} isConnectable={1} />
      </div>
    </>
  );
}

function RightHandler({ handleId, iId }) {

  return (
    <>
      <div className='compartment-node__out-handles'>
        <div>{handleId}</div>
        <Handle type="source" position={Position.Right} id={handleId} style={{ top: 20 * iId + 50 }} isConnectable={1} />
      </div>

    </>
  );

}

// data.counts_in - кол-входных
function CompartmentNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  // console.log(data.counts_in);



  return (
    <>
      <div className="compartment-node">
        <div className="compartment_header">
          <label htmlFor="text"> <strong>{data.name}</strong></label>

        </div>
        <div className="compartment_body">
          <div className="compartment_inhandles">
            {Array.from({ length: data.counts_handles['handle_in'] }, (_, i) => {
              const handleId = `in_${i}`;
              return (
                <LeftHandler handleId={handleId} iId={i} />
              );
            })}

          </div>
          <div className="compartment_outhandles">

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


export default CompartmentNode;