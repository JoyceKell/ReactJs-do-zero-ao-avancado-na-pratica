import React,{Component} from "react";

class Feed extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div key={this.props.key}>
        <h3>{this.props.username}</h3>
        <h4>{this.props.curtidas} / {this.props.comentarios} </h4> 
      </div>
    )
  }
}

export default Feed;