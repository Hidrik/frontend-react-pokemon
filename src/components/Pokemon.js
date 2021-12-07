import React, {useEffect, useState} from 'react';
import axios from 'axios';


function Pokemon({url}) {
    const [isLoaded, setIsLoaded] = useState(false);
    let [pokemon, setData] = useState([])


    useEffect( () => {
        async function getData() {
            try {
                const data = await axios.get(url)
                setData(data.data)
                setIsLoaded(true)
            } catch (e) {
                console.error('Specifieke pokemon ophalen mislukt')
            }
        }
        getData()

    }, [])



    if (!isLoaded) {
        return <div>Laden...</div>
    } else {
        return <>
            <h1>{pokemon.name}</h1>
            <p>De pokemon weegt {pokemon.weight} kg</p>
            <p>De pokemon heeft {pokemon.moves.length} moves</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
            <p>De pokemon heeft de volgende abilities:</p>
            <ul>{pokemon.abilities.map(abilities => {
                return <li>{abilities.ability.name}</li>})}</ul>

        </>



}

}

export default Pokemon;
