import React, {Component} from 'react'
import cronometro from './assets/cronometro.png'
import './style.css'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      numero: 0,
    }
    this.timer = null;
    this.vai = this.vai.bind(this);
    this.limpar = this.limpar.bind(this);
  }

  vai(){

    if (this.timer!=null){
      clearInterval(this.timer);
      this.timer = null;
      var playButton = document.querySelector('#botaoParar');
      playButton.innerHTML = "Vai";
    }else{
      this.timer = setInterval(()=>{
        let state = this.state;
        state.numero += 0.1;
        this.setState(state);
      },100)
      var playButton = document.querySelector('#botaoParar');
      playButton.innerHTML = "Parar";
    }
  }

  limpar(){
    if (this.state.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
    }
    let state = this.state;
    state.numero = 0;
    this.setState(state);
  }

  render(){
    return (
      <div className="container">
        <img src={cronometro} className="img"/>
        <a className="time">{this.state.numero.toFixed(1  )}</a>
        <div className="areaBtn">
          <a onClick={this.vai} className="botao" id="botaoParar">Vai</a>
          <a onClick={this.limpar} className="botao">Limpar</a>
        </div>
      </div>
    );
  }
}

export default App;
