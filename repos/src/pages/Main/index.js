import { Container, Form, SubmitButton } from './styles';
import { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import api from '../../services/api';

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);

  function handleInputChange(e){
    setNewRepo(e.target.value);
  }

 const handleSubmit = useCallback((e)=>{
  e.preventDefault();
    async function submit(){
        const response = await api.get(`/repos/${newRepo}`);
        console.log(response);
        const data = {
          name: response.data.full_name,
        }
        setRepositorios([...repositorios, data]);
        setNewRepo('');
    }
    submit();

 }, [newRepo, repositorios]);

  return (
    <div>
      <Container>
        <h1>
          <FaGithub size={25}/>
          Meus Repositórios
        </h1>

        <Form onSubmit={handleSubmit}>
          <input type="text" placeholder="Adicionar Repositórios" 
          value={newRepo} 
          onChange={handleInputChange}/>

          <SubmitButton>
            <FaPlus color="#fff" size={14}/>
          </SubmitButton>
        </Form>

      </Container>
    </div>
  );
}

export default Main;
