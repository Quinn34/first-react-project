// alle imports nodig voor app
import './App.css'
import Header from'./Header.tsx'
import Footer from './Footer.tsx'
import Api from './Api.tsx'
import Home from './Home.tsx'
import Content from './content.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoriet from './Favoriet.tsx';
import About from './About.tsx';
import Kopen from './Kopen.tsx';
import MarketShareChart from './Cirlcle.tsx'
// ^benodigde imports


function App() {
  return (
    <>
        <Header/>
        <MarketShareChart/>
        {/* ^circle diagram component */}
        <Content/>
        <Api/>
        {/* coin api component */}
        <Footer/>
        <BrowserRouter>
          <Routes>
              <Route path="Home" element={<Home/>}/>
              <Route path="Favoriet" element={<Favoriet />}/>
              <Route path="About" element={<About />}/>
              <Route path="Kopen" element={<Kopen />}/>
          </Routes>
          {/* path naar alle andere paginas */}
        </BrowserRouter>
    </>
  )
}

export default App
