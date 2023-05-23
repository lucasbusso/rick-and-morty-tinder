import React, {useEffect, useState} from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

export default function GraphHome() {
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
    console.log(data)
    
    if(loading) return <h2>Cargando personajes</h2>
    return (
        <Card 
            // leftClick={nextCharacter} 
            // rightClick={addToFavorites}
            {...data.characters.results[0]}
        />
    )
}