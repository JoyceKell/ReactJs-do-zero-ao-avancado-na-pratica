import React, {useState, useEffect} from 'react';

function App() {

  const [tarefas,setTarefas] = useState(['Pagar a conta de luz', 'estudar react']);
  const [input,setInput] = useState('');

  function handleAdd(){
    setTarefas([...tarefas, input]);
    setInput('');
  }

  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('tarefas');
    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])

  return (
    <div>
      <ul>
        {tarefas.map(tarefa=>(
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
