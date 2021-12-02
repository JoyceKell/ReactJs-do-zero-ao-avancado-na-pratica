import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
     form:{
       nome: "", email: "", senha:""
     }
    };

    this.mudaDados = this.mudaDados.bind(this);
  }

 

  mudaDados(e){
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form: form});
  }

  render(){
    return(
      <div> 
       <h1>Titulo</h1>
       <form>
         <p>nome</p>
         <input type="text" name='nome' value={this.state.form.nome}
              onChange={this.mudaDados} />
         <p>email</p>
         <input type="email" name='email' value={this.state.form.email}
              onChange={this.mudaDados} />
         <p>senha</p>
         <input type="password" name='value' value={this.state.form.senha}
              onChange={this.mudaDados} />
         <button type="submit">Cadastrar</button>
       </form>
       <h3>{this.state.form.nome}</h3>
      </div>
    )
  }
}

export default App;
