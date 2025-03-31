import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Favoriet from './Favoriet.tsx';
import Kopen from './Kopen.tsx';
import About from './About.tsx';
import "./index.css"

function Header(){
    return(
    <div className="header">
        <div className="first-box">
            <div className="logo">
                <img src="./assets/logo.png" className="fff" title="#"/>
            </div>
        </div>          
        <BrowserRouter>
      <div className="second-box">
        <div className="content">
            <a href="">Home</a>
          <Link to="/Kopen" className="kopen-link">Kopen</Link>
          <Link to="/Favoriet" className="favoriet-link">Favoriet</Link>
          <Link to="/Overons" className="overons-link">Over ons</Link>
        </div>
      </div>

      <Routes>
        <Route path="/Kopen" element={<Kopen />} />
        <Route path="/Favoriet" element={<Favoriet />} />
        <Route path="/Overons" element={<About />} />
      </Routes>
    </BrowserRouter>
        <div className="third-box">
            <div className="logout">
                <p>Log In</p>
            </div>
        </div>
    </div>
    )
}




export default Header
