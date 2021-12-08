import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import axios from "axios";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemons, setPokemonData] = useState([])
    const [nextPokemon, setNextPokemon] = useState(0)


    useEffect(() => {
        const source = axios.CancelToken.source();
        const offset = 20 * nextPokemon
        let limit = 20

        if (offset === 1100) {
            limit = 18
        }

        setIsLoaded(false)

        async function getData() {
            try {
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                setPokemonData(data.data.results)
                setIsLoaded(true)
                console.log(data)
            } catch (e) {
                window.alert('Lijst van pokemon ophalen mislukt')
            }
        }

        getData()

        return function cleanup() {
            source.cancel()
        }
    }, [nextPokemon])


    /*Als de data niet geladen is:*/
    if (!isLoaded) {
        return <p className='container'>Laden...</p>
    /*Als de data geladen is:*/
    } else {
        return <div className='container'>
            <button
                disabled={nextPokemon === 0}
                onClick={
                    () => {
                        setNextPokemon(nextPokemon - 1)
                    }}>
                Vorige 20
            </button>
            <button
                disabled={nextPokemon === (1100 / 20)}
                onClick={
                    () => {
                        setNextPokemon(nextPokemon + 1)
                    }}>
                Volgende 20
            </button>
            {pokemons.map(
                pokemon => {
                    return <Pokemon key={pokemon.name} url={pokemon.url}/>
                })
            }
        </div>
    }
}

export default App;
