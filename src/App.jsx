import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/task/TaskList";
import Board from "./components/board";
import AuthGuard from "./utils/authGuard"
import HomePage from "./components/page/home";
import VerifyEmail from "./components/common/verifyEmail";

function App() {
  return (
    <>
      <div>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:id" element={
                  <AuthGuard>
                        <TaskList/>
                  </AuthGuard> 
                  } />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
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
