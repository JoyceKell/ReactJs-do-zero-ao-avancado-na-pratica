import { useEffect, useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import './filme-info.css';
import { toast } from "react-toastify";
import api from '../../services/api'

export default function Filme(){
  const {id} = useParams();
  const [filme,setFilme] = useState([]);
  const history = useHistory();

  const[loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      const response = await api.get(`r-api/?api=filmes/${id}`);

      if(response.data.length==0){
        history.replace('/');
        return;
      }

      setFilme(response.data);
      setLoading(false);
    }

   loadFilme();
  },[history,id])

  function salvaFilme(){
    const minhaLista = localStorage.getItem('filmes');
    let filmesSalvos = JSON.parse(minhaLista) || [];
    
    const hasFilme = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id===filme.id);

    if(hasFilme){
      toast.info('Você já possui esse flme salvo!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');  

  }

  if(loading){
    return(
      <div className="filme-info">
      <h1>Carregando seu filme...</h1>
      </div>
    )
  }
  return(
    <div className="filme-info">
    <h1>{filme.nome}</h1>
    <img src={filme.foto} alt={filme.nome}/>
    <h3>Sinopse</h3>
    {filme.sinopse}
    <div className="botoes">
      <button onClick={salvaFilme}>Salvar</button>  
      <button>
      <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
      </button>
    </div>
    </div>
  )
}