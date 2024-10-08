import { Container } from "./styles";
import gitLogo from "../assets/github.png";
import Input from "../components/input";
import ItemRepo from "../components/ItemRepo";
import { useState } from "react";
import Button from "../components/button";
import { api } from "../services/api";


function App() {
  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState("");

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){
      const existRepo = repos.find(repo => repo.id === data.id);
      if(!existRepo){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }
    alert("Repositório não encontrado");
  }

  const handleRemoveRepo = (id) => {
    return repos.filter(repo => {
      return repo.id !== id;
    })
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map((repo) => {
        return <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>})}
    </Container>
  );
}

export default App;
