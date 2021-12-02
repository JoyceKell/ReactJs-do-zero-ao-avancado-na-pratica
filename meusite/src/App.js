import React, {Component} from 'react';
import Feed from './components/feed';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
        feed:[
          {id:1, username: "Matheus", curtidas:10, comentarios:2},
          {id:2, username: "Lucas", curtidas:100, comentarios:17}
        ]
    }
  }

  render(){
    return(
      <div> 
        {this.state.feed.map((item)=>{
          return(
            <Feed key={item.id} username={item.username} curtidas={item.curtidas} comentarios={item.comentarios}/>
          )
        })}
        
      </div>
    )
  }
}

export default App;
