import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      hora:'00:00:00'
    };
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({hora: new Date().toLocaleTimeString()})
    },1000);
  }

  componentDidUpdate(){
    console.log('atualizou')
  }

  shouldComponentUpdate(){
    
  }

  render(){
    return(
      <div> 
        <h3>Meu projeto {this.state.hora}</h3>
      </div>
    )
  }
}

export default App;
