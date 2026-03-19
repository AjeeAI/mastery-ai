# 🧠 MasteryAI - Adaptive Learning Platform

**MasteryAI** is a personalized, AI-driven educational web platform designed to provide highly adaptive learning experiences specifically for Mathematics, English, and Civic Education. By deeply integrating an advanced Neo4j knowledge graph to map conceptual relationships, the platform dynamically tailors lessons, quizzes, and AI tutor insights to match each student's unique learning pace and knowledge gaps.

## ✨ Key Features

* **Knowledge Graph Integration:** Utilizes Neo4j graph databases to map complex educational concepts and prerequisite knowledge, enabling the platform to construct intelligent, personalized learning paths.
* **AI Tutor & Contextual Insights:** Features dedicated, AI-powered components designed to evaluate student performance, explain mistakes contextually, and provide targeted recommendations for improvement.
* **Visual Learning Maps:** Incorporates interactive learning maps to help students visualize their curriculum progression and conceptual mastery across different subjects.
* **Comprehensive Assessment Engine:** Supports module-specific quizzes, continuous practice sessions, and deep concept analytics to track true comprehension rather than just rote memorization.
* **Gamification & Engagement:** Motivates learners through structured dashboards, dynamic statistics, and competitive leaderboards.

## 🏗️ System Architecture

* **Frontend SPA:** Built as a robust Single Page Application (SPA) using React, heavily modularized into distinct components, layouts, and page views.
* **Authentication & State:** Implements custom React Context providers (`AuthContext.jsx`, `UserContext.jsx`) alongside secure routing (`ProtectedRoute.jsx`) to manage sessions across student and teacher portals.
* **Cloud Infrastructure:** Fully configured for serverless global edge deployment and hosting via Firebase.
* **Graph Database (Backend Data Layer):** The underlying intelligence relies on a Neo4j database initialized and managed via specific Cypher scripts to build the educational taxonomy.

## 🛠️ Tech Stack

* **Framework:** React.js
* **Build Tool:** Vite for highly optimized hot-module replacement and minification
* **Data Modeling:** Neo4j (Cypher query language)
* **API Communication:** Centralized external data fetching service
* **Code Quality:** Pre-configured ESLint pipelines
* **Hosting:** Firebase Hosting

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* npm or yarn
* A running Neo4j instance (Local or AuraDB) with the graph seeded using the provided Cypher scripts.

### Installation & Execution

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/mastery-ai.git](https://github.com/yourusername/mastery-ai.git)
    cd mastery-ai/mastery-ai
    ```

2.  **Seed the Knowledge Graph:**
    Execute the provided Cypher scripts in your Neo4j instance to establish the educational nodes and relationships. Use the delete script to clear existing nodes if necessary.

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---
## 👨‍💻 About the Developer
Engineered by **Ajijolaoluwa Adesoji**, Full-Stack & AI Engineer. This platform showcases the powerful intersection of modern React frontends, Agentic AI, and advanced graph databases (Neo4j) to build intelligent systems capable of complex reasoning and personalized education.
