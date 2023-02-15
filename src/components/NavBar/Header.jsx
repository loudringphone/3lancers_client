import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';

const Header = () => {
  return (

      <div className="header">
          <div className="logo">
            <nav>
              <a href="/home"><h1>3Lancers</h1></a>
            </nav>
          </div>
          <div className='NavBar'>
            <MobileNavigation />
            <Navigation />
          </div>
          <button id="deskButton" href="/new-request">
            <a href="/new-request">Post Request</a>
          </button>
          <button id="mobButton">
            <a href="/new-request">+</a>
          </button>
      </div>
  );
}

export default Header;


