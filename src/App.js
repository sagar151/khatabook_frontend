import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesLayout from "./routes/Routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* <Router> */}
        <RoutesLayout />
        <ToastContainer />
      {/* </Router> */}
    </>
  );
}

export default App;
