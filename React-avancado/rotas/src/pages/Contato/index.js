import {Link} from 'react-router-dom'

function Contato() {
  return (
    <div>
      <h1>Contatos...</h1>
      <Link to="/sobre">Sobre</Link>
      <br />
      <Link to="/">home</Link>
    </div>
  );
}

export default Contato;
