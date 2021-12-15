import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function Customers(){

  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  async function handleAdd(e){
    e.preventDefault();
    if(nomeFantasia!=='' && cnpj!== '' && endereco !== ''){
      await firebase.firestore().collection('customers').add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco
      }).then(()=>{
        setNomeFantasia('');
        setCnpj('');
        setEndereco('');
        toast.info('empresa cadastrada com sucesso');
      }).catch((error)=>{
        toast.error('erro ao cadastrar essa empresa');
      })  
    }
    else{
      toast.error('preencha todos os campos!');
    }
  }

  return(
    <div>
      <Header/>
      <div className="content">
          <Title name="Clientes">
            <FiUser size={25}/>
          </Title>

          <div className="container">
              <form className="form-profile customers" onSubmit={handleAdd}>
                <label>Nome Fantasia</label>
                <input type="text" value={nomeFantasia} placeholder="nome da sua empresa" onChange={(e)=>setNomeFantasia(e.target.value)}/>

                <label>CNPJ</label>
                <input type="text" value={cnpj} placeholder="seu CNPJ" onChange={(e)=>setCnpj(e.target.value)}/>

                <label>Endereço</label>
                <input type="text" value={endereco} placeholder="Endereço da empresa" onChange={(e)=>setEndereco(e.target.value)}/>

                <button type="submit">Cadastrar</button>
              </form>
          </div>
      </div>
    </div>
  )
}