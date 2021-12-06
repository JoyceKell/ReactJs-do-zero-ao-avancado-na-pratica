import {useParams} from 'react-router-dom';

function Produto() {
  const { id } = useParams();
  return (
    <div>
     <h1>Grade de produtos</h1>
     <p>produto selecionado: {id}</p>
    </div>
  );
}

export default Produto;
