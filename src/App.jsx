import "./App.css";
import Content from "./components/homePage/home";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/task/TaskList";
import Board from "./components/board";
import AuthGuard from "./utils/authGuard"

function App() {
  return (
    <>
      <div>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/task/:id" element={
                  <AuthGuard>
                        <TaskList/>
                  </AuthGuard> 
                  } />
                <Route path="/dashboard" element={
                <AuthGuard>
                   <Board/>
                </AuthGuard>
                  } />
              </Routes>
            </Layout>
          </Router>
      </div>
    </>
  );
}

export default App;
