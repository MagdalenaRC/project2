import React from 'react'
import './Rulebook.css'
import { useState, useEffect } from 'react'
const Rulebook = () => {

    const [example, setExample] = useState({image_uris : {large : ''}})
    const [random, setRandom] = useState(0)

    const test = () => {
        setRandom(random+1)
        console.log(random)
        return
    }

    useEffect(()=>{
        fetch('https://api.scryfall.com/cards/random')
            .then(res=>res.json())
            .then(data => setExample(data))
    },[random])



    return (
        <article className='rules'>
            <h1>HOW TO PLAY MAGIC: THE GATHERING</h1>

            <div id='intro'>
                Magic: The Gathering (MTG) is a collectible card game created by mathematics professor 
                Richard Garfield and published by Wizards of the Coast. First released in 1993, it has 
                become one of the most popular and enduring trading card games in the world. In Magic: The 
                Gathering, players assume the role of powerful wizards known as Planeswalkers, who use 
                spells, creatures, artifacts, and other magical abilities to defeat their opponents.
            </div>

            <h3> Rules </h3>

            <div id='rules'>
                The game is played using a deck of Magic cards, which are divided into several different categories. Each 
                player starts with a deck of at least 60 cards and begins the game with a starting life 
                total of 20. The goal is to reduce your opponent's life total from 20 to 0 by attacking 
                with creatures or using spells and abilities.
            </div>

            <div id='types'>
                There are 8 types of cards in MTG:
                <ul>
                    <li>Creatures - primary means to attack, defend, and activate abilities during a turn</li>
                    <li>Artifacts - represent special objects, devices, equipment, etc. to add special abilities</li>
                    <li>Enchantments - have a lasting impact on the game by providing advantages and disadvantages </li>
                    <li>Sorceries - offer powerful spells that deliver impactful, short-term effects, perfect for disrupting an opponent's strategy or bolstering your own </li>
                    <li>Instants - short-term effects that can deal damage to a target or allow you to view cards in your library</li>
                    <li>Planeswalkers - can alter the course of your battle by providing reusable abilities that grant you game advantages, such as extra draws, additional life points, or annihilating your opponent's creatures</li>
                    <li>Battles - enter the battlefield face-up with defense counters that indicate the amount of damage required to defeat the card</li>
                    <li>Lands -  represent terrains, environments, and locations from the Multiverse </li>
                </ul>
            </div>

            <h3>How to Read a Magic Card</h3>

            <div className='exampleContainer'>

                <img id='exampleCard' src={example.image_uris.large}/>
                
                <div id='exampleDetails'>
                    <ul>
                        <p>Card Name: {example.name}</p>
                        <p>Mana Cost: {example.mana_cost}</p>
                        <p>Type: {example.type_line}</p>
                        <p>Set Symbol: {example.rarity}</p>
                        <p>Rules Text: {example.oracle_text}</p>
                        <p>Flavor Text: {example.flavor_text}</p>
                        <p>Power/Toughness: {example.power}/{example.toughness}</p>
                        <button onClick={test}>Try it yourself</button>
                    </ul>
                </div>
            </div>

        </article>
    )
}

export default Rulebook