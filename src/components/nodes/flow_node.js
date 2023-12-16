import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Card from 'react-bootstrap/Card';
import './nodes_css/flow_node_css.css'
const handleStyle = { left: 10 };

function LeftHandler({ handleId, iId }) {

  return (
    <>
      <div className='flow-node__in-handles'>
        <div>{handleId}</div>
        <Handle type="target" position={Position.Left} id={handleId} style={{ top: 20 * iId + 50 }} isConnectable={1} />
      </div>
    </>
  );
}

function RightHandler({ handleId, iId, coef }) {

  return (
    <>
      <div className='flow-node__out-handles'>
        <div><strong>{coef}</strong>*{handleId}</div>
        <Handle type="source" position={Position.Right} id={handleId} style={{ top: 20 * iId + 50 }} isConnectable={1} />
      </div>

    </>
  );

}

function FlowNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Card >
        <div className="flow-node">
          <div className="flow_header">
            <label htmlFor="text">{data.sfactor["name"]}({data.source})</label>

          </div>
          <div className="flow_body">


            <div className="flow_inhandles">

              <div className='flow-node__in-handles'>
                <div>{data.source}</div>
                <Handle type="target" position={Position.Left} id={data.source} isConnectable={1} />
              </div></div>


              <div className='flow-node__in-handles'>
                Коэффициент перехода:<p>{data.sfactor["name"]} = {data.sfactor["value"]}</p>
              </div>


            <div className="flow_outhandles">

              {Array.from({ length: data.counts_handles['handle_out'] }, (_, i) => {
                const handleId = `out_${i}`;
                return (
                  <RightHandler handleId={handleId} iId={i} coef={data.target["coefs"][i]} />
                );
              })}
            </div>
          </div>
        </div>
      </Card>


    </>
  );
}


export default FlowNode;