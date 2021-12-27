import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { useSelector } from "react-redux";
import './style.css';

function Header() {
  const reserveSize = useSelector(state => state.reserve);

  return (
   <header className="container">
     <Link to="/">
         <img className="logo" src={logo} alt="logo do projeto"/>
     </Link>
     <Link to="/reserva" className="reserva">
        <div>
          <strong>Minhas reservas</strong>
          <span>{reserveSize.length} reservas</span>
        </div>
     </Link>
   </header>
  );
}

export default Header;