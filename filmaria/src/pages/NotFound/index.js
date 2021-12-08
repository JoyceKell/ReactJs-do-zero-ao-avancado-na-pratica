import './notFound.css'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return(
    <div className="not-found">
      <h1>404</h1>
      <h3>Página não encontrada!</h3>
      <Link to="/">Veja outros filmes!</Link>
    </div>
  )
}