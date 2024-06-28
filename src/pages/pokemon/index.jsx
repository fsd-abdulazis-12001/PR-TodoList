import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import UsePokemon from '../../hooks/pokemon/usePokemon';
const index = () => {
  const {
    pokemonList,
    isProcessing,
    error,
    offset,
    handleNext,
    handlePrevious
  } = UsePokemon();
  const navigate = useNavigate();

   return (
    <div>
      <div className="pagination-buttons">
        <button onClick={() => navigate('/')}>Home</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="pokemon-list">
        {isProcessing ? (
          <p>Loading...</p>
        ) : (
          pokemonList.map(poke => (
            console.log(poke),
            <li key={poke.name} className="pokemon-item">
              <Link to={`/pokemon/detail?name=${poke.name}&offset=${offset}`}>
                <img src={poke.sprite} alt={poke.name} className="pokemon-thumbnail" />
                <p>{poke.name}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={offset === 0}>Previous</button>
        <button onClick={() => navigate('/compare')}>Compare Pokemon</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default index
