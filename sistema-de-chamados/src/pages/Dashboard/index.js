import { useContext, useState , useEffect} from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './dashboard.css';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2} from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from '../../services/firebaseConnection';
import { format } from "date-fns";
import Modal from "../../components/Modal";

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){
  const [chamados,setChamados] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  const {signOut} = useContext(AuthContext);

  useEffect(()=>{
    loadChamados();

    return()=>{

    }
  },[])

  async function loadChamados(){
    await listRef.limit(5).get()
    .then((snapshot)=>{
      updateState(snapshot)
    })
    .catch((error)=>{
      console.log(error);
      setLoadingMore(false);
    })
    setLoading(false);
  }

  function togglePostModal(item){
    console.log(item);
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5).get()
    .then((snapshot)=>{
      updateState(snapshot);
    })
    .catch((error)=>{})
  }

  async function updateState(snapshot){
    const isCollectionEmpty = snapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];
      snapshot.forEach((item)=>{
        lista.push({
          id: item.id,
          assunto: item.data().assunto,
          cliente: item.data().cliente,
          clienteId: item.data().clienteId,
          created: item.data().created,
          createdFormated: format(item.data().created.toDate(),'dd/MM/yyyy'),
          status: item.data().status,
          complemento: item.data().complemento,
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1 ];
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    }else{
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  if(loading){
    return(
      <div>
         <Header/>
          <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25}/>
          </Title>

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
          </div>
      </div>
    )
  }
  
  return(
    <div>
      <Header/>
      <div className="content">
      <Title name="Atendimentos">
        <FiMessageSquare size={25}/>
      </Title>

      {chamados.length===0 ? (
        <div className="container dashboard">
        <span>Nenhum chamado registrado...</span>
        <Link to="/new" className="new"> <FiPlus size={25} color="#fff"/>Novo Chamado</Link>
      </div>
      ) : <>
       <Link to="/new" className="new"> <FiPlus size={25} color="#fff"/>Novo Chamado</Link>
       <table>
         <thead>
           <tr>
             <th scope="col">Cliente</th>
             <th scope="col">Assunto</th>
             <th scope="col">Status</th>
             <th scope="col">Cadastrado em</th>
             <th scope="col">#</th>
           </tr>
         </thead>
         <tbody>
           {chamados.map((item, index)=>{
             return(
                <tr key={index}>
                <td data-label="Cliente">{item.cliente}</td>
                <td data-label="Assunto">{item.assunto}</td>
                <td data-label="Status"><span className="badge" style={{backgroundColor: item.status === 'aberto' ? '#5cb85c' : '#999'}}>{item.status}</span></td>
                <td data-label="Cadastrado">{item.createdFormated}</td>
                <td data-label="#">
                  <button className="action" style={{backgroundColor: '#3583f6'}}><FiSearch color="#fff" size={17} onClick={()=> togglePostModal(item)}/></button>
                  <Link to={`/new/${item.id}`} className="action" style={{backgroundColor: '#f6a935'}}><FiEdit2 color="#fff" size={17}/></Link>
                </td>
              </tr>
             )
           })}
           
         </tbody>
       </table>
        
        {loadingMore && <h3 style={{textAlign:"center",marginTop:15}}>Buscando dados...</h3>}
        { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar Mais</button>}
      </>}

      
      </div>
      {showPostModal && (
        <Modal conteudo={detail} close={togglePostModal}/>
      )}
    </div>
  )
}