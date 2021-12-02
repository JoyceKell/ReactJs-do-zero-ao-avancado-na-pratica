import React, {Component} from 'react'
class Membro extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: props.nome
    };
    this.entrar = this.entrar.bind(this);
    this.sair = this.sair.bind(this);
  }

  entrar(){
    this.setState({nome: "Joyce"})
  }

  sair(){
    this.setState({nome: "Visitante"})
  }

  render(){
    return(
      <div>
        <h2>Bem vindo(a) {this.state.nome}</h2>
        <button onClick={this.entrar}>Entrar</button>
        <button onClick={this.sair}>Sair</button>
      </div>
    )
  }
}

export default Membro;