import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = parseInt(searchParams.get('offset')) || 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);

  const fetchPokemon = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=25`);
      setPokemonList(response.data.results);
    } catch (error) {
      console.error("Error mengambil data Pokemon", error);
      setError('Gagal mengambil data Pokemon. Silahkan coba lagi.');
    }  
  };

  const fetchPokemonDetails = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const details = {};
     
      
      await Promise.all(pokemonList.map(async (poke) => {
        const response = await axios.get(poke.url);
        details[poke.name] = response.data.sprites.front_default;
      }));
      setPokemonDetails(details);
    } catch (error) {
     
      setError('Gagal mengambil detail pokemon.', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    setSearchParams({ offset: offset + 25 });  
  };

  const handlePrevious = () => {
    setSearchParams({ offset: offset - 25 });
  };

  return (
    <div>
      <div className="pagination-buttons">
        <button onClick={() => navigate('/')}>Halaman Utama</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="pokemon-list">
        {isProcessing ? (
          <p>Tunggu Sebentar...</p>
        ) : (
          pokemonList.map(poke => (
            <li key={poke.name} className="pokemon-item">
            <Link to={`/pokemon/detail?name=${poke.name}&offset=${offset}`}>
              <img src={pokemonDetails[poke.name]} alt={poke.name} className="pokemon-thumbnail" />
              <p>{poke.name}</p>
            </Link>
          </li>
          ))
        )}
      </ul>
      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={offset === 0}>Sebelumnya</button>
        <button onClick={() => navigate('/compare')}>Bandingkan Pokemon</button>
        <button onClick={handleNext}>Berikutnya</button>
      </div>
    </div>
  );
};

export default PokemonList;
