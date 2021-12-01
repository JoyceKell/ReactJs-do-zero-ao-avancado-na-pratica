import React from 'react';

const Sobre = (props)=>{
  return (
    <div>
      <h2>Olá, sou o {props.nome}</h2>
      <h3>cargo: {props.cargo}</h3>
      <h3>idade: {props.idade} </h3>
    </div>
  );
}

const Equipe = (props) => {
  return(
    <div>
      <Sobre nome={props.nome} cargo={props.cargo} idade={props.idade}/>
    </div>
  )
}

function App(){
  return(
    <div>
      <h1>conheça a nossa equipe: </h1>
      <Equipe nome="Joyce" cargo="programadora" idade="21"/>
    </div>
  );
}

export default App;