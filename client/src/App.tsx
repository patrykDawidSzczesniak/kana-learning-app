import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import FreeplayPage from "./pages/FreeplayPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<FreeplayPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
