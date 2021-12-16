import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlus } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';

export default function New(){
  const {id} = useParams();
  const history = useHistory();
  const [customers,setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [assunto,setAssunto] = useState('Suporte');
  const [status,setStatus] = useState('aberto');
  const [complemento, setComplemento] = useState('');
  const [customerSelected, setCustomerSelected] = useState(0);
  const {user} = useContext(AuthContext);
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(()=>{
    async function loadCustomers(){
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot)=>{
        let lista = [];
        snapshot.forEach((doc)=>{
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia,
          })
        })
        if(lista.length===0){
          console.log('nenhuma empresa encontrada');
          setCustomers([{id:'1', nomeFantasia: 'Freela'}]);
          setLoadCustomers(false);
          return;
        }
        setCustomers(lista);
        setLoadCustomers(false);

        if(id){
          loadId(lista);
        }
      })
      .catch((error)=>{
        setLoadCustomers(false);
        setCustomers([{id:'1', nomeFantasia: ''}]);
      })
    };
    loadCustomers();
  }, [id])

  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot)=>{
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);

      let index = lista.findIndex(item=> item.id === snapshot.data().clienteId);
      setCustomerSelected(index);
      setIdCustomer(true);
    })
    .catch((error)=>{
      console.log('erro no id passado');
      setIdCustomer(false);
    })
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idCustomer){
      await firebase.firestore().collection('chamados').doc(id).update({
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
      .then(()=>{
        toast.success('Chamado editado com sucesso');
        setCustomerSelected(0);
        setComplemento('');
        history.push('/dashboard');
      })
      .catch(()=>{
        toast.error('ops, erro ao registrar');
      })

      return;
    }

    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid,
    }).then(()=>{
      toast.success('chamado criado com sucesso!');
      setComplemento('');
      setCustomerSelected(0);
    })
    .catch((error)=>{
      toast.error('ops, erro ao registrar');
    })
  }

  function handleChangeSelect(e){
    setAssunto(e.target.value);
  }

  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleChangeCustomers(e){
    setCustomerSelected(e.target.value);
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlus size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>

            {loadCustomers ? (
              <input type="text" disabled={true} value="carregando..." />
            ): 
            <select value={customerSelected} onChange={handleChangeCustomers}>
            {customers.map((item, index)=>{
              return(
                <option key={item.id} value={index}>
                  {item.nomeFantasia}
                </option>
              )
            })}
          </select>}
            

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio"
              name="radio"
              value="aberto" onChange={handleOptionChange} checked={status==='aberto'}/>
              <span>Em aberto</span>

              <input type="radio" onChange={handleOptionChange} checked={status==='progresso'}
              name="radio"
              value="progresso"/>
              <span>Em progresso</span>

              <input type="radio" onChange={handleOptionChange} checked={status==='atendido'}
              name="radio"
              value="atendido"/>
              <span>Atendido</span>
            </div>
            <label>Complemento</label>
            <textarea value={complemento} type="text" onChange={(e)=>setComplemento(e.target.value)} placeholder="descreva seu problema (opcional)"></textarea>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}