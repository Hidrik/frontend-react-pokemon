import React, {useEffect, useState} from 'react';
import axios from 'axios';


function toUppercaseFirstLetter(string) {
    return (string.charAt(0).toUpperCase()  + string.slice(1))
}

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
        return pokemon && <div className='pokemon-info'>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className='pokemon-picture'/>
            <h1 className='pokemon-title'>{toUppercaseFirstLetter(pokemon.name)}</h1>
            <p>De pokemon weegt {pokemon.weight} kg</p>
            <p>De pokemon heeft {pokemon.moves.length} moves</p>
            <p>De pokemon heeft de volgende abilities:</p>
            <ul>{pokemon.abilities.map(abilities => {
                return <li>{toUppercaseFirstLetter(abilities.ability.name)}</li>})}</ul>

        </div>



}

}

export default Pokemon;
