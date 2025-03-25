import "./index.css"

function Header(){
    return(
    <div className="header">
        <div className="first-box">
            <div className="logo">
                <img src="./assets/logo.png" className="fff" title="#"/>
            </div>
        </div>          
        <div className="second-box">
            <div className="content">
                <a href="">Home</a>   
                <a href="">Kopen</a>
                <a href="">Stonks</a>
                <a href="">Over ons</a>
            </div>
        </div>
        <div className="third-box">
            <div className="logout">
                <p>Log In</p>
            </div>
        </div>
    </div>
    )
}




export default Header
