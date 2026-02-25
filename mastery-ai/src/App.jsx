import { Routes, Route, Navigate } from "react-router-dom";
import Quizes from "./component/quizes";
import InProgress from "./component/in-progress";
import CompletedPage from "./component/completed";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/quiz/1" replace />} />

  <Route path="/quiz/:quizId" element={<Quizes />} />
  <Route path="/quiz/:quizId/in-progress" element={<InProgress />} />
  <Route path="/quiz/:quizId/completed" element={<CompletedPage />} />
</Routes>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import Quizes from "./pages/Quizes";
// import InProgress from "./pages/InProgress";
// import CompletedPage from "./pages/CompletedPage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/quiz/:quizId" element={<Quizes />} />
//       <Route path="/quiz/:quizId/in-progress" element={<InProgress />} />
//       <Route path="/quiz/:quizId/completed" element={<CompletedPage />} />
//     </Routes>
//   );
// }

// export default App;