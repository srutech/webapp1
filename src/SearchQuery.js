import React, { useState, useEffect, useCallback } from 'react';
import { getDriver } from './neo4jConfig';
import Graph from './Graph';
import './SearchQuery.css';

const SearchQuery = ({ selectedEntity, onNodeClick }) => {
  const [entityName, setEntityName] = useState(selectedEntity || '');
  const [queryLimit, setQueryLimit] = useState(25); // Default limit
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeQuery = useCallback(async () => {
    setLoading(true);
    setError(null);

    const driver = getDriver();
    const session = driver.session();

    try {
      const query = `
        MATCH (m)-[r]->(n)
        WHERE toLower(n.name) CONTAINS toLower("${entityName}")
        OR toLower(m.name) CONTAINS toLower("${entityName}")
        RETURN id(m) as m_id, m.name as m_name, id(n) as n_id, n.name as n_name, type(r) as r_type
        LIMIT ${queryLimit}
      `;

      const result = await session.run(query);

      if (result.records.length === 0) {
        setError('No results found for the selected entity.');
        // Do not update the graphData, so the previous data remains visible
      } else {
        const nodesMap = new Map(); // To track unique nodes
        const edges = [];

        result.records.forEach((record) => {
          const sourceNodeId = record.get('m_id').toNumber();
          const targetNodeId = record.get('n_id').toNumber();
          const relationship = record.get('r_type');
          const sourceNodeLabel = record.get('m_name');
          const targetNodeLabel = record.get('n_name');

          // Add source node if not already in nodesMap
          if (!nodesMap.has(sourceNodeId)) {
            nodesMap.set(sourceNodeId, { id: sourceNodeId, label: sourceNodeLabel });
          }

          // Add target node if not already in nodesMap
          if (!nodesMap.has(targetNodeId)) {
            nodesMap.set(targetNodeId, { id: targetNodeId, label: targetNodeLabel });
          }

          // Add the edge between nodes
          edges.push({
            from: sourceNodeId,
            to: targetNodeId,
            label: relationship,
          });
        });

        const nodes = Array.from(nodesMap.values());

        setGraphData({ nodes, edges });
      }
    } catch (err) {
      setError('Query failed: ' + err.message);
    } finally {
      session.close();
      setLoading(false);
    }
  }, [entityName, queryLimit]);

  useEffect(() => {
    if (selectedEntity) {
      setEntityName(selectedEntity);
      console.log('Selected Entity:', selectedEntity); // Log the selected entity for debugging
      executeQuery();
    }
  }, [selectedEntity, executeQuery]);

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); executeQuery(); }} className="query-form">
        <div className="form-group">
          <label>Entity Name:</label>
          <input
            type="text"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Query Limit:</label>
          <input
            type="number"
            value={queryLimit}
            onChange={(e) => setQueryLimit(Math.floor(parseInt(e.target.value, 10)))}
            min="1"
            className="form-control"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          Execute Query
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {graphData.nodes.length > 0 && (
        <div style={{ height: '600px', width: '100%' }}>
          <Graph nodes={graphData.nodes} edges={graphData.edges} onNodeClick={onNodeClick} />
        </div>
      )}
    </div>
  );
};

export default SearchQuery;
