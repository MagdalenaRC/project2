import React, { useState , useEffect, useContext } from 'react';
import App from '../App/App';
import Card from 'react-bootstrap/Card';

const DetailsPage = (props) => {
 const {pageSwitch , setPageSwitch, currentCard, setCurrentCard} = useContext (App)
 //const content = props.
    return (
       < Card className='magic-card' onClick={() => {
            setPageSwitch(!pageSwitch)
            setCurrentCard()
            }}>
        <Card.Img className='magic-card-img' src = {props}  />    
        <Card.Body>  
        <Card.Title>{content}</Card.Title>
        </Card.Body> 
        </Card>
    )
}

export default DetailsPage