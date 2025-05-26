import {useState, useEffect, useMemo, memo} from 'react';
import './index.css'

const PoliticianCard = memo(({name, biography, image, position}) => {
  console.log("card-politici");  
  return(
    <div className="card-politici">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>posizione:</strong>{position}</p>
      <p>{biography}</p>
    </div>
  )  
});

function App() {  

  const [politician, setPolitician] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
    .then(res => res.json())
    .then(data => setPolitician(data))
    .catch(error => console.error(error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politician.filter(politician => {
      const nameMatch = politician.name.toLowerCase().includes(search.toLowerCase());
      const bioMatch = politician.biography.toLowerCase().includes(search.toLowerCase());
      return nameMatch || bioMatch;
  });
  }, [politician, search]);
  

  return (
    <div className='pol-page'>
      <h1>Lista Politici</h1>
      <input 
      type="text"
      placeholder='Cerca per nome o biografia'
      value={search}
      onChange={e => setSearch(e.target.value)}
      />
      <div className="lista-politici">
        {filteredPoliticians.map(politician =>(
          <PoliticianCard  key={politician.id} {...politician}/>
        ))}
      </div>
      
    </div>
  )
}

export default App
