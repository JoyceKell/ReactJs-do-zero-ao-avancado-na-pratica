import React, {Component} from 'react';
import biscoito from './assets/biscoito.png'
import './style.css'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      textoFrase:''
    };
    this.frases = ["Siga os bons e aprendam com eles", "O riso é a menor distância entre duas pessoas",
  "Deixe de lado as preocupações e seja feliz", "Acredite em milagres, mas não dependa deles", "a maior barreira para o sucesso é o medo"]
    this.quebraBiscoito = this.quebraBiscoito.bind(this);
  }

  quebraBiscoito(){
    let state = this.state;
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length); 
    state.textoFrase = this.frases[numeroAleatorio];
    this.setState(state);
  }

  render(){
    return(
      <div className="container"> 
        <img src={biscoito} className="img"/>
        <Botao acaoBtn={this.quebraBiscoito}/>
        <h3 className="textoFrase">{this.state.textoFrase}</h3>
      </div>
    )
  }
}

class Botao extends Component{
  render(){
    return(
      <div>
        <button onClick={this.props.acaoBtn}>Abrir Biscoito</button>
      </div>
    )
  }
}

export default App;
