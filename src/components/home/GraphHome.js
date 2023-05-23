import React, {useEffect, useState} from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

export default function GraphHome() {
    let [chars, setChars] = useState([])
    
    
    let query = gql`
    {
        characters {
            results {
                name
                image
            }
        }
    }
    `
    let {data, loading, error} = useQuery(query)
    
    useEffect(()=>{
        if(data && !loading && !error) {
            setChars([...data.characters.results])
        }
    }, [data])

    function nextCharacter() {
        chars.shift()
        setChars([...chars])
    }

    function addToFavorites() {
        chars.
    }
        
    if(loading) return <h2>Cargando personajes</h2>
    return (
        <Card 
            leftClick={nextCharacter} 
            rightClick={addToFavorites}
            {...chars[0]}
        />
    )
}