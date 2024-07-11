import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Join from "./pages/Join";
import User from "./pages/User";
import { useEffect, useState } from "react";
import "./App.css";
import Triplist from "./pages/Triplist";
import TripModal from "./pages/TripModal";
import TrInRegistration from "./pages/TrInRegistration";
import TripDetail from "./pages/TripDetail";
import Festival from "./pages/Festival";
import FestivalReg from "./pages/FestivalReg";
import SearchTrDomesticCategory from "./pages/SearchTrDomesticCategory";
import SearchTrOverseasCategory from "./pages/SearchTrOverseasCategory";
import Cookies from "js-cookie";
import FesDetailKorea from './pages/FesDetailKorea'
function App() {
  const [ID, setID] = useState("");
  const [LoginOrNot, setLoginOrNot] = useState(false);

  useEffect(() => {
    const storedID = Cookies.get("ID");
    const storedLoginOrNot = Cookies.get("LoginOrNot");

    if (storedID) {
      setID(storedID);
    }
    if (storedLoginOrNot) {
      setLoginOrNot(storedLoginOrNot === "true");
    }
  }, []);

  return (
    <Router>
      <>
        <Header
          ID={ID}
          setID={setID}
          LoginOrNot={LoginOrNot}
          setLoginOrNot={setLoginOrNot}
          Cookies={Cookies}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <Login
                setID={setID}
                setLoginOrNot={setLoginOrNot}
                Cookies={Cookies}
              />
            }
          />
          <Route path="/join" element={<Join />} />
          <Route path="/User" element={<User ID={ID} />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/triplist" element={<Triplist />} />
          <Route path="/modal" element={<TripModal />} />
          <Route path="/trinregistration" element={<TrInRegistration />} />
          <Route
            path="/tripDetail/:id"
            element={<TripDetail User_ID={Cookies.get("ID")} />}
          ></Route>
          <Route path="/festival" element={<Festival />} />
          <Route path="/festivalReg" element={<FestivalReg />} />
          <Route path="/KFesDetail/:id" element={<FesDetailKorea />} />
          <Route
            path="/searchtrdomesticcategory"
            element={<SearchTrDomesticCategory />}
          />
          <Route
            path="/searchtroverseascategory"
            element={<SearchTrOverseasCategory />}
          />
          <Route path="/ranking" element={<ShowRank />} />
          <Route path="/way-detail/:id" element={<WayDetail />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
