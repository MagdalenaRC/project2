import React from 'react'
import './Rulebook.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

const Rulebook = () => {

    const [example, setExample] = useState({image_uris : {large : ''}})
    const [random, setRandom] = useState(0)

    const test = () => {
        setRandom(random+1)
        // '#exampleDetails'.toggle()
        let elements = document.getElementsByClassName('answer')
        Array.prototype.map.call(elements, (element)=>{
            element.innerHTML='Hover for Answer'
        })

    }

    const hover = (id) => {
        if (random>=1){
            let text = '';
            typeof example[id] !== 'undefined' ? text = example[id] : text = 'Not applicable' 
            document.getElementById(id).innerHTML= text
        }
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
                There are 8 types of cards in MTG: <br/><br/>
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

                <img id='exampleCard' src={example.image_uris.large} alt='No image available'/>
                
                <div id='exampleDetails'>
                    <ul>
                        <div className = 'category' onMouseOver={()=>hover('name')}>
                            Card Name: 
                            <div className='answer' id='name'>
                                {random<1 ? example.name: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('mana_cost')}>
                            Mana Cost: 
                            <div className='answer' id='mana_cost'>
                                {random<1 ? example.mana_cost: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('type_line')}>
                            Type: 
                            <div className='answer' id='type_line'>
                                {random<1 ? example.type_line: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('rarity')}>
                            Set Symbol: 
                            <div className='answer' id='rarity'>
                                {random<1 ? example.rarity: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('oracle_text')}>
                            Rules Text: 
                            <div className='answer' id='oracle_text'>
                                {random<1 ? example.oracle_text: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('flavor_text')}>
                            Flavor Text: 
                            <div className='answer' id='flavor_text'>
                                {random<1 ? example.flavor_text: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('power')}>
                            Power: 
                            <div className='answer' id='power'>
                                {random<1 ? example.power: 'Hover for Answer'}
                            </div> 
                        </div>
                        <div className = 'category' onMouseOver={()=>hover('toughness')}>
                            Toughness: 
                            <div className='answer' id='toughness'>
                                {random<1 ? example.toughness: 'Hover for Answer'}
                            </div> 
                        </div>
                        
                    </ul>
                </div>
            </div>

            <button id='newCard' onClick={test}>
                Give it A Try
                <FontAwesomeIcon id='icon' icon={faHatWizard} />
            </button>

        </article>
    )
}

export default Rulebook