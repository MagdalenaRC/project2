import React from 'react'
import { Link } from 'react-router-dom'
import './GettingStarted.css'

const GettingStarted = () => {

    return (
        <div className = 'gettingStartedWrapper'>
            <div className='gettingStartedSection'>
                <h2 className='header'>What is Magic the Gathering?</h2>
                <p className='information'>Magic the gathering is a trading card game that is 
                    commonly refered to as MTG. Magic the Gathering 
                    revolves around players collecting cards and building 
                    decks from them that support various play styles.It 
                    was created in 1993 by Richard Garfield and published 
                    by Wizards of the Coast. The game pits two players 
                    against each other with decks they built themselves. 
                    Please view the <Link to = '/rules'>rulebook</Link> on how to play.</p>
            </div>
            <div className='gettingStartedSection'>
                <h2 className='header'>How to navigate our site?</h2>
                <div>
                <p className='information'>Welcome to the Magic the gathering tool that will 
                    allow you to view <Link to = '/deckbuilder'>Magic the Gathering cards</Link>, their 
                    properties and build your own decks. We also have a 
                    section for viewing the MTG <Link to = '/rules'>rulebook</Link>. Click 
                    on one of the links at the top headerbar to get started!</p>
                </div>
            </div>
        </div>
        
    )
}

export default GettingStarted