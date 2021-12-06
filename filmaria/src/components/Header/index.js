import {Link} from 'react-router-dom';
import './header.css';
//https://sujeitoprogramador.com/r-api/?api=filmes/

function Header() {
  return (
    <>
      <header>
        <Link className="logo" to="/">Filmaria</Link>
        <Link className="favoritos" to="/">Favoritos</Link>
      </header>
    </>
  );
}

export default Header;
