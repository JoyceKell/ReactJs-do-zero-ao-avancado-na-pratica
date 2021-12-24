import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'
import './style.css';

function Header() {
  return (
   <header className="container">
     <Link to="/">
         <img className="logo" src={logo} alt="logo do projeto"/>
     </Link>
     <Link to="/reserva" className="reserva">
        <div>
          <strong>Minhas reservas</strong>
          <span>0 reservas</span>
        </div>
     </Link>
   </header>
  );
}

export default Header;