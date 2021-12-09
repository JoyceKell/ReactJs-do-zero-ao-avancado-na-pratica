import { UserContext } from "../../contexts/user";
import { useContext } from "react";

function Nome() {
  const {alunos, setAlunos} = useContext(UserContext);
  return (
    <div className="App">
      <span style={{color: '#FF0000'}}>bem-vindo: {alunos} </span>
      <button onClick={()=>setAlunos('kelly')}>troca nome</button>
    </div>
  );
}

export default Nome;
