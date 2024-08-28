// src/App.js
import React, { useState } from 'react';
import SearchQuery from './SearchQuery';

const App = () => {
  const [selectedEntity, setSelectedEntity] = useState('');

  const handleNodeClick = (entityName) => {
    setSelectedEntity(entityName);
  };

  return (
    <div>
      <h2>Entity Resolution</h2>
      <br />
      <SearchQuery selectedEntity={selectedEntity} onNodeClick={handleNodeClick} />
    </div>
  );
};

export default App;
