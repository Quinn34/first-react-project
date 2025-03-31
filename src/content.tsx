import "./index.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Favoriet from './Favoriet';

function Content(){
    return(
        <BrowserRouter>
        <div>
          {/* Hart link naar Favoriet */}
          <Link to="/Favoriet">
            <div className="heart"></div>
          </Link>
          
          <Routes>
            <Route path="/Favoriet" element={<Favoriet />} />
            {/* Voeg andere routes toe zoals nodig */}
          </Routes>
        </div>
      </BrowserRouter>
    )
    }

export default Content
