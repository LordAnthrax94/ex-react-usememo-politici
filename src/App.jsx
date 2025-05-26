import {useState, useEffect, use} from 'react';
import './index.css'

function App() {  

  const [politician, setPolitician] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
    .then(res => res.json())
    .then(data => setPolitician(data))
    .catch(error => console.error(error));
  }, []);

  console.log(politician);
  

  return (
    <div>
      <h1>Lista Politici</h1>
      <div className="lista-politici">
        {politician.map(politician =>(
          <div className="card-politici" key={politician.id}>
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <p>posizione:{politician.position}</p>
            <p>{politician.biography}</p>

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default App
