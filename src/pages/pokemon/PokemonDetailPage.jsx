import { useNavigate } from 'react-router-dom';
import UsePokemon from '../../hooks/pokemon/usePokemon';
import { useSearchParams } from 'react-router-dom';

const PokemonDetailPage = () => {
  const [searchParams] = useSearchParams();
  const pokename = searchParams.get('name');
  const { pokemon, offset } = UsePokemon(pokename);
  const navigate = useNavigate();

  return (
    <div>
   
      <div className="pagination-buttons">
        <button onClick={() => navigate(`/pokemon?offset=${offset}`)}>Back</button>
      </div>
      {pokemon ? (
        <div>
          <div className='pokemon-details'>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>DEX Id: {pokemon.id}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p>Moves: {pokemon.moves.slice(0, 5).map((move) => move.move.name).join(', ')}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetailPage;
