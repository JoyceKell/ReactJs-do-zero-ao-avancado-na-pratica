import Alunos from './components/Alunos'
import { useState } from 'react';
import UserProvider from './contexts/user';

function App() {

  return (
    <UserProvider>
      <div className="App">
        <h1>Context API</h1>
        <hr />
        <Alunos/>
    </div>
    </UserProvider>
  );
}

export default App;
