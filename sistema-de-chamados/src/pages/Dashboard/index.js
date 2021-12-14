import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

export default function Dashboard(){
  const {signOut} = useContext(AuthContext);
  return(
    <div>
      <Header/>
      <h1>pagina dashboard</h1>
    </div>
  )
}