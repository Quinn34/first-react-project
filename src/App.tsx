import './App.css'
import Header from'./Header.tsx'
import Footer from './Footer.tsx'
import Api from './Api.tsx'
import Content from './content.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favoriet from './Favoriet.tsx';


function App() {
  return (
    <>
        <Header/>
        <Content/>
        <Api/>
        <Footer/>
        <BrowserRouter>
          <Routes>
              <Route path="Favoriet" element={<Favoriet />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
