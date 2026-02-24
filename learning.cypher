// 1. Use MERGE to ensure "Ajee" is only created once
MERGE (u: Person {name: "Ajee"})
SET u.role = "AI Fellow" // SET updates the property if the node already

// 2. Use MERGE for the project as well

MERGE (p:Project {name: "Neo4j Learning"})
ON CREATE SET p.status = "Started"

// 3. Use MERGE for the relationship to avoid duplicate arrows

MERGE (u) - [:WORKS_ON] -> (p)


RETURN u, p;

// 4. Match the pattern to verify

MATCH (u: Person {name: "Ajee"}) - [:WORKS_ON] -> (p: Project)

RETURN p.name, p.status


// // 1. Create a person (you!)
// CREATE (u:Person {name: "Ajee", role: "AI Fellow"})

// // 2. Create a project
// CREATE (p:Project {name: "Neo4j Learning", status: "Started"})

// // 3. Connect them
// CREATE (u)-[:WORKS_ON]->(p)

// RETURN u, p;

// MATCH (u:Person {name: "Ajee"}) - [:WORKS_ON] -> (p:Project)
// RETURN p.name, p.status