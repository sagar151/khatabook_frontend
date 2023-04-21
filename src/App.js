import "./App.css";
import Redirect from "./pages/Redirect/Redirect";
import AuthLayout from "./pages/Layout/AuthLayout";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
       <Routes>
        <Route exact path="/" element={<AuthLayout />}></Route>
        <Route exact path="/redirect" element={<Redirect />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
