import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import axios from "axios";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemons, setData] = useState([])
    const [nextPokemon, setNextPokemon] = useState(0)
    const [init, setInit] = useState(true)

    useEffect(() => {
        async function getData() {

            try {
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
                setData(data.data.results)
                setIsLoaded(true)
            } catch (e) {
                window.alert('Lijst van pokemon ophalen mislukt')
            }
        }

        getData()
    }, [])

    useEffect(() => {

        if (!init) {
            /*Hiermee zorg ik dat er nooit meer data aangevraagd kan worden dan er beschikbaar is*/
            let offset = 20 * nextPokemon
            let limit = 20
            if (offset === 1100) {
                limit = 18
            }

            async function getData() {
                try {
                    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                    setData(data.data.results)
                    setIsLoaded(true)
                    console.log(data)
                } catch (e) {
                    window.alert('Lijst van pokemon ophalen mislukt')
                }
            }

            getData()

        } else {
            setInit(false)
        }
    }, [nextPokemon])


    if (!isLoaded) {
        return <p>Laden...</p>
    } else {
        return <>
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
        </>
    }
}

export default App;
