import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
    };
   this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(event){
    const {nome,email,senha} = this.state

    if(nome!='' && email!= '' && senha!= ''){
      alert(`nome: ${nome} \nemail:${email} \npassword:${senha}`)
      event.preventDefault();
    }else{
      alert('campos vazios');
    }
  }

  render(){
    return(
      <div> 
       <h1>Titulo</h1>
       <form onSubmit={this.cadastrar}>
         <p>nome</p>
         <input type="text" value={this.state.nome}
              onChange={(e)=>this.setState({nome:e.target.value})} />
         <p>email</p>
         <input type="email" value={this.state.email}
              onChange={(e)=>this.setState({email:e.target.value})} />
         <p>senha</p>
         <input type="password" value={this.state.senha}
              onChange={(e)=>this.setState({senha:e.target.value})} />
         <button type="submit">Cadastrar</button>
       </form>
      </div>
    )
  }
}

export default App;
