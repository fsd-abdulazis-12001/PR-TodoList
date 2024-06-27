import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComparePokemon = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 3000);  
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const fetchPokemon = async (name, setPokemon) => {
    try {
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon", error);
      setPokemon(null);
      if (error.response && error.response.status === 404) {
         setIsError(true);
      }
      
    } 
    
  };

  const handleCompare = () => {
    if (isProcessing) {
      console.log("Tunggu Dulu Sedang diproses lur.....");
      return;
    }
    if (name1.length === 0 || name2.length === 0) {
       
      return;
    }
    setIsProcessing(true);
    fetchPokemon(name1.toLowerCase(), setPokemon1);
    fetchPokemon(name2.toLowerCase(), setPokemon2);
    setIsProcessing(false);
  };

  return (
    <div>
     <div className="pagination-buttons">
        
        <button onClick={() => navigate(-1)}>Kembali</button>
     
      </div>
      <h1>Compare Pokemon</h1>
      <div className='pokemon-input-wrapper'>
      <input className='pokemon-input'
        type="text"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="Name Pokemon"
      />
      <input className='pokemon-input'
         type="text"
         value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Name Pokemon"
          />
      </div>

      <div className="pagination-buttons">
          <button onClick={handleCompare}>Bandingkan</button>
          </div>

      <div>
        { isError ? ( <p style={{ textAlign: 'center', color: 'red' }}>Pokemon Tidak ditemukan</p> ) : isProcessing ? ( <p style={{ textAlign: 'center', color: 'green' }}>Tunggu Dulu Sedang diproses lur.....</p> ) : pokemon1 && pokemon2 ? (
          
          <div>
            <div className='pokemon-details'>
            <h1>{pokemon1.name}</h1>
            <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
            <p>DEX Id: {pokemon1.id}</p>
            <p>Height: {pokemon1.height}</p>
            <p>Weight: {pokemon1.weight}</p>
            <p>Types: {pokemon1.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon1.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p>Moves:{pokemon1.moves.slice(0,5).map((move) => move.move.name).join(', ')}  </p>
            
            </div>
            <p style={{ textAlign: 'center', color: 'white' }}>VS</p>
            <div className='pokemon-details'>
            <h1>{pokemon2.name}</h1>
            <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
            <p>DEX Id: {pokemon2.id}</p>
            <p>Height: {pokemon2.height}</p>
            <p>Weight: {pokemon2.weight}</p>
            <p>Types: {pokemon2.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon2.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p>Moves:{pokemon2.moves.slice(0,5).map((move) => move.move.name).join(', ')}  </p>
            
            </div>
          </div>
        ) : (
          <p>Masukkan Nama Pokemon Untuk Di Bandingkan</p>
        )}
      </div>
    </div>
  );
};

export default ComparePokemon;
