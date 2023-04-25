import { ToastContainer } from "react-toastify";
import RoutesLayout from "./routes/Routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RoutesLayout />
      <ToastContainer />
    </>
  );
}

export default App;
