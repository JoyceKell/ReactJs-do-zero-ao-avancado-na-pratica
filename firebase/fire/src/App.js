import firebase from './firebaseConnection';
import {useState} from 'react';
import './style.css'

function App() {

  const [titulo,setTitulo] = useState('');
  const [autor,setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    await firebase.firestore().collection('posts').add({
      titulo: titulo,
      autor: autor
    }).then(()=>{
      console.log('Dados cadastrados com sucesso');
      setTitulo('');
      setAutor('');
    }).catch((error)=>{
      console.log('gerou algum erro' + error);
    })
  }



  async function buscaPost(){
    await firebase.firestore().collection('posts').get()
    .then((snapshot)=>{
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          autor: doc.data().autor,
          titulo: doc.data().titulo
        })
      })
      setPosts(lista);
    }).catch((error)=>{
      console.log('deu algum erro ' + error)
    })
  }

  return (
    <div>
     <h1>ReactJs+firebase</h1><br />
     <div className="container">
     <label>Título:</label>
     <textarea type="text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}></textarea>

     <label>Author:</label>
     <textarea type="text" value={autor} onChange={(e)=> setAutor(e.target.value)}></textarea>

     <button onClick={handleAdd}>Cadastrar</button>
     <button onClick={buscaPost}>Buscar post</button> <br />

     <ul>
       {posts.map((post)=>{
         return(
           <li key={post.id}>
             <span>Título: {post.titulo}</span> <br />
             <span>Autor: {post.autor}</span> <br /> <br />
           </li>
         )
       })}
     </ul>
     </div>
    </div>
  );
}

export default App;
