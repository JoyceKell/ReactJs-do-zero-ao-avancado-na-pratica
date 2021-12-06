import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

const Routes = ()=>{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/sobre" component={Sobre}/>
        <Route path="/contato" component={Contato}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;