import React, {Component} from 'react'
class Membro extends Component{

  constructor(props){
    super(props);
    this.state = {
      status: 1,
    };
  }

  render(){
    return(
      <div>
        {
          this.state.status == 1 && <h1>bem vindo ao sistema</h1>
        }
        <div>curso reactJs</div>
      </div>
    )
  }
}

export default Membro;