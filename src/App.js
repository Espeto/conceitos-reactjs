import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    } );
  }, []);

  async function handleAddRepository() {
    const result = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: `http://github.com/Espeto/${Date.now()}`,
      techs: ["JavaScript", "React"]
    });

    const repository = result.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`);

    const status = result.status; 
    
    if(status === 204) {

      const newRepositories = repositories.filter(repository => repository.id !== id);

      setRepositories(newRepositories);
    }
    else {
      console.log(status);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repository => (
                <li key={repository.id}>
                {repository.title}

                <button onClick={ () => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
                </li>
            )
          )  
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
