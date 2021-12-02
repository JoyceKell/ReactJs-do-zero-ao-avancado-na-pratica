import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      sexo: 'masculino'
    };
    this.trocaEmail = this.trocaEmail.bind(this);
    this.trocarSenha = this.trocarSenha.bind(this);
    this.trocarSexo = this.trocarSexo.bind(this);
  }

  trocaEmail(e){
    let valorDigitado = e.target.value;
    this.setState({email:valorDigitado});
  }

  trocarSenha(e){
    let valorDigitado = e.target.value;
    this.setState({senha: valorDigitado});
  }

  trocarSexo(e){
    let valorDigitado = e.target.value;
    this.setState({sexo: valorDigitado})
  }

  render(){
    return(
      <div> 
        <h2>Login</h2>
        email:
        <input type="email" name="email" value={this.state.email}
        onChange={this.trocaEmail}/>
        senha:
        <input type="password" name="senha" value={this.state.senha} onChange={this.trocarSenha}/>
        sexo:

        <select name="sexo" value={this.state.sexo} onChange={this.trocarSexo}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        {this.state.sexo}
      </div>
    )
  }
}

export default App;
