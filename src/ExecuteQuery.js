import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const ExecuteQuery = ({ driver }) => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!driver) return;

    const session = driver.session();

    session
      .run('MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 25')
      .then((result) => {
        const nodes = {};
        const roots = new Set();  // Track potential root nodes

        result.records.forEach((record) => {
          const source = record.get('n').properties;
          const target = record.get('m').properties;

          if (!nodes[source.id]) {
            nodes[source.id] = { name: source.name, children: [] };
            roots.add(source.id);  // Mark as a potential root
          }

          if (!nodes[target.id]) {
            nodes[target.id] = { name: target.name, children: [] };
          }

          // Add target to source's children
          nodes[source.id].children.push(nodes[target.id]);

          // If target is a child, it's not a root
          roots.delete(target.id);
        });

        // Choose the first root node (you may need to handle multiple roots)
        const rootNode = nodes[Array.from(roots)[0]];
        setTreeData([rootNode]); // Tree expects an array of root nodes
      })
      .catch((err) => {
        console.error('Query failed:', err);
      })
      .finally(() => {
        session.close();
        setLoading(false);
      });
  }, [driver]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '600px' }}>
      {treeData ? <Tree data={treeData} orientation="vertical" /> : <p>No data available</p>}
    </div>
  );
};

export default ExecuteQuery;
