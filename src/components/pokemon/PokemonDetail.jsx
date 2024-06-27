import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate ,useSearchParams } from 'react-router-dom';

const PokemonDetail = () => {
 
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const offset = parseInt(searchParams.get('offset')) || 0;

  const [pokemon, setPokemon] = useState(null);
  const [rawr, setRawr] = useState(null);
  const navigate = useNavigate()
 


  useEffect(() => {
    fetchPokemonDetail();
  }, [name]);

  useEffect(() => {
    if (rawr) {
      rawr.volume = 0.1;
      rawr.play();
    }
  }, [rawr]);

  const fetchPokemonDetail = async () => {
    try {
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
      const audioUrl = response.data.cries.latest;  
      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        setRawr(newAudio);
      }
    } catch (error) {
      console.error("Error fetching Pokemon details", error);
    }
  };

  return (
    <div>
     <div className="pagination-buttons">
        <button onClick={() => navigate(`/pokemon?offset=${offset}`)}>Back</button>
      </div>
      {pokemon ? (
        <div>
      
          {console.log(pokemon)}
        
          <div className='pokemon-details'>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>DEX Id: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          <p>Moves:{pokemon.moves.slice(0,5).map((move) => move.move.name).join(', ')}  </p>
         
          {/* <audio controls src={pokemon.cries.latest} autoPlay /> */}
         
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
