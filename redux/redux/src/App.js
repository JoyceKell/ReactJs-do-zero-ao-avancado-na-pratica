import Routes from "./routes";
import { Router } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import history from "./services/history";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Routes/>
      </Router>
    </Provider>
   
  );
}

export default App;
