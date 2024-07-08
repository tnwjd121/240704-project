import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import Login from './pages/Login'
import Test from './pages/Test';
import Join from './pages/Join';
import Triplist from './pages/Triplist'

function App() {
  return (
    <Router>
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/triplist" element={<Triplist/>}/>
        </Routes>
        <Footer/>
      </>
    </Router>
  )
}

export default App;
