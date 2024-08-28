import React, { useState } from 'react';
import neo4j from 'neo4j-driver';

const DEFAULT_DB_SETTINGS = {
  neo4jHost: '54.205.236.117',
  neo4jPort: '7687',
  neo4jUsername: 'neo4j',
  neo4jPassword: 'shipmate-value-cry',
};

const ConnectDatabase = ({ setDriver, nextStep }) => {
  const [dbSettings, setDbSettings] = useState(DEFAULT_DB_SETTINGS);

  const onConnectDb = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    const connectionDriver = neo4j.driver(
      `bolt://${dbSettings.neo4jHost}:${dbSettings.neo4jPort}`,
      neo4j.auth.basic(dbSettings.neo4jUsername, dbSettings.neo4jPassword)
    );

    connectionDriver
      .verifyConnectivity()
      .then(() => {
        setDriver(connectionDriver);
        nextStep(); // Move to the next step after successful connection
      })
      .catch((err) => {
        console.error('Failed to connect to the database:', err);
        // handle wrong connection settings (e.g., show an error message)
      });
  };

  const onChange = (e) => {
    setDbSettings({
      ...dbSettings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onConnectDb}>
      <div>
        <label>Host</label>
        <input
          type="text"
          name="neo4jHost"
          value={dbSettings.neo4jHost}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Port</label>
        <input
          type="text"
          name="neo4jPort"
          value={dbSettings.neo4jPort}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="neo4jUsername"
          value={dbSettings.neo4jUsername}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="neo4jPassword"
          value={dbSettings.neo4jPassword}
          onChange={onChange}
        />
      </div>
      <button type="submit">Connect</button>
    </form>
  );
};

export default ConnectDatabase;
