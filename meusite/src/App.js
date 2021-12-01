import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome:"matheus",
      contador:0
    }
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  }
  aumentar(){
    let state = this.state;
    state.contador +=1; 
    this.setState(state);
  }

  diminuir(){
    let state = this.state;
    state.contador -=1;
    this.setState(state);
  }

  render(){
    return(
      <div>
        <h1>conheça a nossa equipe</h1>
        <h3><button onClick={this.aumentar}>aumentar</button>{this.state.contador} <button onClick={this.diminuir}>diminuir</button></h3>
      </div>
    )
  }
}

export default App;
