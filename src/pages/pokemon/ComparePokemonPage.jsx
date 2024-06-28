import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsePokomon from '../../hooks/pokemon/usePokemon';
import AutoComplete from '../../components/input/pokemon/AutoComplete';
const ComparePokemonPage = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [compareName1, setCompareName1] = useState('');
  const [compareName2, setCompareName2] = useState('');
  const { pokemon: pokemon1, isLoading: isLoading1, error: error1 } = UsePokomon(compareName1.toLowerCase());
  const { pokemon: pokemon2, isLoading: isLoading2, error: error2 } = UsePokomon(compareName2.toLowerCase());
  const navigate = useNavigate();

  const handleCompare = () => {
    if (!name1 || !name2) {
      return;
    }
    setCompareName1(name1);
    setCompareName2(name2);
  };

  return (
    <div>
      <div className="pagination-buttons">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h1>Compare Pokemon</h1>
      <div className='pokemon-input-wrapper'>
      <AutoComplete value={name1} onChange={setName1} />
      <AutoComplete value={name2} onChange={setName2} />
      </div>
      <div className="pagination-buttons">
        <button onClick={handleCompare}>Compare</button>
      </div>
      <div>
        {error1 && <p style={{ color: 'red' }}>{error1}</p>}
        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
        {isLoading1 || isLoading2 ? (
          <p>Loading...</p>
        ) : (
          <div>
            {pokemon1 && (
              <div className='pokemon-details'>
                <h1>{pokemon1.name}</h1>
                <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
                <p>DEX Id: {pokemon1.id}</p>
                <p>Height: {pokemon1.height}</p>
                <p>Weight: {pokemon1.weight}</p>
                <p>Types: {pokemon1.types.map((type) => type.type.name).join(', ')}</p>
                <p>Abilities: {pokemon1.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                <p>Moves: {pokemon1.moves.slice(0, 5).map((move) => move.move.name).join(', ')}</p>
              </div>
            )}
            {pokemon1 && pokemon2 && <p style={{ textAlign: 'center', color: 'white' }}>VS</p>}
            {pokemon2 && (
              <div className='pokemon-details'>
                <h1>{pokemon2.name}</h1>
                <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
                <p>DEX Id: {pokemon2.id}</p>
                <p>Height: {pokemon2.height}</p>
                <p>Weight: {pokemon2.weight}</p>
                <p>Types: {pokemon2.types.map((type) => type.type.name).join(', ')}</p>
                <p>Abilities: {pokemon2.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                <p>Moves: {pokemon2.moves.slice(0, 5).map((move) => move.move.name).join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePokemonPage;
