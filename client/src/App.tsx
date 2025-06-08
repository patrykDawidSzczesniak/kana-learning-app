import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<h3 className="bg-blue-500">Hello!</h3>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
