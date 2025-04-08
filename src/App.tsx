// alle imports nodig voor app
import './App.css'
import Header from'./Header.tsx'
import Footer from './Footer.tsx'
import Api from './Api.tsx'
import Content from './content.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoriet from './Favoriet.tsx';
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
              <Route path="Favoriet" element={<Favoriet />}/>
          </Routes>
          {/* path naar alle andere paginas */}
        </BrowserRouter>
    </>
  )
}

export default App
