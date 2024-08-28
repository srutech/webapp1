// src/Graph.js
import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

const Graph = ({ nodes, edges, onNodeClick }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    const data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges),
    };
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
      },
      edges: {
        width: 2,
        color: { inherit: true },
      },
      physics: {
        enabled: true,
      },
    };

    const network = new Network(networkRef.current, data, options);

    // Handle node click events
    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = data.nodes.get(nodeId);
        onNodeClick(node.label);
      }
    });
  }, [nodes, edges, onNodeClick]);

  return <div ref={networkRef} style={{ height: '600px', width: '100%' }} />;
};

export default Graph;
