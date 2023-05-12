import { ToastContainer } from "react-toastify";
import RoutesLayout from "./routes/Routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function App() {
  return (
    <>
      <RoutesLayout />
      <ToastContainer />
    </>
  );
}

export default App;
