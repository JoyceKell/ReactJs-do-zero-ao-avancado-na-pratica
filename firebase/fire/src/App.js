import firebase from './firebaseConnection';
import {useState, useEffect} from 'react';
import './style.css'

function App() {

  const [titulo,setTitulo] = useState('');
  const [autor,setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');
  const [email,setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user,setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({});

  useEffect(()=>{
    async function loadPosts(){
      await firebase.firestore( ).collection('posts').onSnapshot((doc)=>{
        let meusPosts = [];

        doc.forEach((item)=>{
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        })
        setPosts(meusPosts);
      })
    }

    loadPosts();
  })

  useEffect(()=>{
    async function checkLogin(){
      await firebase.auth().onAuthStateChanged((user)=>{
        if (user){
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email
          })
        }else{
          setUser(false);
          setUserLogged({});
        }
      })
    }
    checkLogin();
  },[])

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

  async function editarPost(){
    await firebase.firestore().collection('posts').doc(idPost).update({
      titulo: titulo,
      autor: autor
    }).then(()=>{
      console.log("dados atualizados");
      setIdPost('');
      setTitulo('');
      setAutor('');
    }).catch((error)=>{
      console.log("erro");
    })
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id).delete()
    .then(()=>{
      console.log('deu certo');
    }).catch((error)=>{
      console.log("erro");
    })
  }

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email,senha)
    .then(()=>{
      console.log("deu crt")
    }).catch((error)=>{
      console.log(error);
    })
  }

  async function logout(){
    await firebase.auth().signOut();
  }

  async function fazerLogin(){
    await firebase.auth().signInWithEmailAndPassword(email,senha).then(()=>{
      console.log("tudook");
    }).catch((error)=>{
      console.log(error);
    });
  }

  return (
    <div>
     <h1>ReactJs+firebase</h1><br />

    {user && (
      <div><strong>seja bem vindo, voce esta logado</strong> <br />
      <span>{userLogged.email}</span>
      </div>
    )}

     <div className="container">
       <label>Email: </label>
       <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
       <label>Senha:</label>
       <input type="text" value={senha} onChange={(e)=>setSenha(e.target.value)}/> <br />
       <button onClick={fazerLogin}>fazer login</button>
       <button onClick={novoUsuario}>Cadastrar</button>
       <button onClick={logout}>Deslogar</button> <br /><br />
     </div>
     <div className="container">
      <h2>Banco de dados</h2>
     <label>Id:</label>
     <input type="text" value={idPost} onChange={(e)=>setIdPost(e.target.value)} />

     <label>Título:</label>
     <textarea type="text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}></textarea>

     <label>Author:</label>
     <textarea type="text" value={autor} onChange={(e)=> setAutor(e.target.value)}></textarea>

     <button onClick={handleAdd}>Cadastrar</button>
     <button onClick={buscaPost}>Buscar post</button> <br />
     <button onClick={editarPost}>Editar post</button> <br />


     <ul>
       {posts.map((post)=>{
         return(
           <li key={post.id}>
             <span>id: {post.id}</span> <br />
             <span>Título: {post.titulo}</span> <br />
             <span>Autor: {post.autor}</span> <br /> 
             <button onClick={()=>excluirPost(post.id)}>excluir post</button> <br /> <br />

           </li>
         )
       })}
     </ul>
     </div>
    </div>
  );
}

export default App;
