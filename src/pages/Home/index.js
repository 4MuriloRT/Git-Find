import {useEffect, useState} from 'react'
import { Header } from '../../components/Header'
import background from '../../assets/background.png'
import ItemList from '../../components/ItemList'
import './styles.css'
function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    setCurrentUser(null); 
    setRepos(null);       
  
    try {
      const userData = await fetch(`https://api.github.com/users/${user}`);
      if (!userData.ok) throw new Error("Usuário não encontrado");
  
      const newUser = await userData.json();
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });
  
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      setRepos(newRepos);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };
  
  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
        <img src={background} className='background' alt='Fundo app'/>  
        <div className='info'>
          <div>
            <input name='usuario'
            value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder='@username'/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (<>
            <div className='perfil'>
            <img src={currentUser.avatar_url} 
            className='profile' alt='Imagem de perfil'/>
            <div>
              <h3>{currentUser.name} </h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          </>):null}
          {repos?.length ? (
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repo => (
                <ItemList key={repo.id} title={repo.name} description={repo.description}/>
              ))}
            </div>
          ):null}
        </div>
      </div>
    </div>
  );
}

export default App;
