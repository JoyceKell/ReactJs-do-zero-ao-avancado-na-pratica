import './profile.css';
import Header from '../../components/Header';
import { useState, useContext } from 'react';
import Title from '../../components/Title';
import { FiSettings, FiUpload} from 'react-icons/fi';
import imgAvatar from '../../assets/avatar.png';
import firebase from '../../services/firebaseConnection';

import { AuthContext } from '../../contexts/auth';

export default function Profile(){
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome,setNome] = useState(user && user.nome);
  const [email,setEmail] = useState(user && user.email);
  const [avatar,setAvatar] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleSave(e){
    e.preventDefault();

    if(imageAvatar===null && nome!==''){
      await firebase.firestore().collection('users').doc(user.uid)
      .update({
        nome: nome,
      })
      .then(()=>{
        let data = {
          ...user,
          nome: nome,
        };
        setUser(data);
        storageUser(data);
      })
    }

  }

  return(
    <div>
      <Header/>
    <div className="content">
    <Title name="Meu Perfil">
      <FiSettings size={25}/>
    </Title>
    <div className="container">
      <form className="form-profile" onSubmit={handleSave}>
          <label className="label-avatar">
            <span><FiUpload color="#fff" size={25}/></span>
            <input type="file" accept="image/*"/> <br />
            {avatar === null ? 
            <img src={imgAvatar} width = "250" height = "250" alt = "foto de perfil do usuario"/> : 
            <img src={avatar} width = "250" height = "250" alt = "foto de perfil do usuario"/>}
          </label>

          <label>Nome</label>
          <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>

          <label>Email</label>
          <input type="text" value={email} disabled={true}/>

          <button type="submit">Salvar</button>
      </form>
    </div>

    <div className="container" onClick={()=>signOut()}>
      <button className="logout-btn">
        Sair
      </button>
    </div>

    </div>
    </div>
  )
}