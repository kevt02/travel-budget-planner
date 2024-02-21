import images from '../images';
import './Home.css';
function Home() {
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="logo">
                        <img src={images.piggy} alt="piggy" />
                        <a className="navbar-brand" href="#!">Penny Pilot</a>
                    </div>
                    <div className="button">
                        <button className="nav-link">Log In</button>
                    </div>
                </div>
            </nav>
            <div id="main">
            <button class="openbtn" onclick="openNav()">☰</button> 
            </div>
            <div id="mySidebar" className="sidebar">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
                <button type="button" class="btn btn-link"><img src={images.piggy} alt="piggy"/>  Savings</button>
                <button type="button" class="btn btn-link"><img src={images.plane} alt="plane"/>  Flights</button>
                <button type="button" class="btn btn-link"><img src={images.train} alt="train"/>  Trains</button>
                <button type="button" class="btn btn-link"><img src={images.stay} alt="stay"/>  Stays</button>
            </div>
        </>
    )
}

export default Home;