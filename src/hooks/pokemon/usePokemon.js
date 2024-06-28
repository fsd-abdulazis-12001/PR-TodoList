import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const usePokemon = (name = null) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokeNameList, setAllPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [rawr, setRawr] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = parseInt(searchParams.get('offset')) || 0;

  useEffect(() => {
    if (name) {
      fetchPokemonDetail();
    } else {
      fetchPokemonList();
    }
  }, [name, offset]);

  useEffect(() => {
    if (rawr) {
      rawr.volume = 0.1;
      rawr.play();
    }
  }, [rawr]);

  useEffect(() => {
    fetchAllPokeNameList();
  },[])
  const fetchAllPokeNameList = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0');
      const name = response.data.results.map((poke) => poke.name);
      setAllPokemonList(name);

    } catch (error) {
      console.error("Error Mengambil Data Pokemon", error);
      setError('Gagal Mengambil Data Pokemon');
    } finally {
      setIsProcessing(false);
    }
  }
  const fetchPokemonList = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=25`);
      const results = response.data.results;

      const detailedResults = await Promise.all(results.map(async (poke) => {
        const response = await axios.get(poke.url);
        return { ...poke, sprite: response.data.sprites.front_default };
      }));

      setPokemonList(detailedResults);
    } catch (error) {
      console.error("Error Mengambil Data Pokemon", error);
      setError('Gagal Mengambil Data Pokemon');
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchPokemonDetail = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
      const audioUrl = response.data.cries?.latest;
      if (audioUrl) {
        const newAudio = new Audio(audioUrl);
        setRawr(newAudio);
      }
    } catch (error) {
      console.error(`Error Gagal Mengambil Data Pokemon dengan nama -> "${name}"`, error);
      setError(`Error Gagal Mengambil Data Pokemon dengan nama -> "${name}"`);
      setPokemon(null);
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

  return {
    
    pokemonList,
    pokemon,
    isProcessing,
    error,
    offset,
    allPokeNameList,
    handleNext,
    handlePrevious
  };
};

export default usePokemon;
