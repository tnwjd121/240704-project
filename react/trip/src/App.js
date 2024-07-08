import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Join from "./pages/Join";
import User from "./pages/User";
import { useState } from "react";

function App() {
  const [ID, setID] = useState("");
  const [LoginOrNot, setLoginOrNot] = useState(false);
  return (
    <Router>
      <>
        <Header
          ID={ID}
          setID={setID}
          LoginOrNot={LoginOrNot}
          setLoginOrNot={setLoginOrNot}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={<Login setID={setID} setLoginOrNot={setLoginOrNot} />}
          />
          <Route path="/join" element={<Join />} />
          <Route path="/test" element={<Test />} />
          <Route path="/User" element={<User ID={ID} />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
