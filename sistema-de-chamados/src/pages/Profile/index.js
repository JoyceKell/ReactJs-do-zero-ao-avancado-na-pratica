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

  async function handleUpload(){
    const currentUid = user.uid;
    const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then(async ()=>{
      console.log('foto enviada com sucesso');

      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then(async (url)=>{
        let UrlFoto = url;

        await firebase.firestore().collection('users').doc(user.uid).update({
          avatarUrl: UrlFoto,
          nome: nome,
        })
        .then(()=>{
          let data = {
            ...user,
            avatarUrl: UrlFoto,
            nome: nome,
          };

          setUser(data);
          storageUser(data);
        })
      })
    })
  }

  function handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0];
      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image);
        setAvatar(URL.createObjectURL(e.target.files[0]));
      }else{
        alert('envie uma imagem do tipo png ou jpeg');
        setImageAvatar(null);
        return null;
      }
    }
  }

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

    else if (nome!=='' && imageAvatar!==null){
      handleUpload();
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
            <input type="file" accept="image/*" onChange={handleFile} /> <br />
            {avatar === null ? 
            <img src={imgAvatar} className="form-profile" width = "250" height = "250" alt = "foto de perfil do usuario"/> : 
            <img src={avatar} className="form-profile" width = "250" height = "250" alt = "foto de perfil do usuario"/>}
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