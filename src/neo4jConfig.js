// src/neo4jConfig.js
import neo4j from 'neo4j-driver';

const NEO4J_URI = 'bolt://54.205.236.117';
const NEO4J_USERNAME = 'neo4j';
const NEO4J_PASSWORD = 'shipmate-value-cry';

let driver;

export const getDriver = () => {
  if (!driver) {
    driver = neo4j.driver(
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
    );
  }
  return driver;
};
