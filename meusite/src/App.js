import React, {Component} from 'react';

class Equipe extends Component{
  render(){
    return(
      <div>
        <h2>Funcionou</h2>
        <h2>{this.props.nome}</h2>
      </div>
    );
  }
}

function App(){
  return(
    <div>
      <h1>conheça a nossa equipe</h1>
      <Equipe nome="joyce"/>
    </div>
  )
}

export default App;
