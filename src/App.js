import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='sign-in' element={<SignIn />} />
      </Routes>
      <Main/>
    </div>
  );
}

export default App;
