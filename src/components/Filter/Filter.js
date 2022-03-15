import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import {State,City} from 'country-state-city'
import './Filter.css'

function Filter() {
    const dispatch = useDispatch()

    const [governate, setGovernate] = useState('')
    const [city, setCity] = useState('')
    const [code, setCode] = useState('')
    const [price, setPrice] = useState(0)
    const [maison, setMaison] = useState(false)
    const [appartement, setAppartement] = useState(false)

    const handleGovChange = (e) => {
        const {value} = e.target
        setCode(value)
        value===''?setGovernate(''):
        setGovernate(State.getStateByCodeAndCountry(value,'TN').name)
    }
    
    
return (
    <div className='filter'>
        <div className='filterInput'>
            <div className='filterInput-bloc'>
                <Form.Select aria-label="Default select example"    
                value={code} onChange={(e)=>{handleGovChange(e)}}> 
                <option value="">Selectionner une gouvernorat</option>
                {State.getStatesOfCountry('TN').map(state=>
                <option value={state.isoCode}>{state.name}</option>)}
                </Form.Select>
                <Form.Select aria-label="Default select example" 
                value={city} 
                onChange={(e)=>{setCity(e.target.value);console.log(e.target.value)}}>
                <option value="">Selectionner une ville</option>
                {City.getCitiesOfState('TN',code).map(el=>
                <option value={el.name}>{el.name}</option>)}
                </Form.Select>
            </div>
            <div className='filterInput-bloc'>
                <Form.Group className="mb-3 localType" 
                style={{textAlign:'left',marginTop:'20px',display:'flex'}}>
                <Form.Check inline name="meuble" type="checkbox" label="maison" value="maison"
                onChange={(e)=>setMaison(e.target.checked)}/>
                <Form.Check inline name="meuble" type="checkbox" label="appartement" value="appartement"
                onChange={(e)=>setAppartement(e.target.checked)} />
                </Form.Group>
                <Form.Control type="txt"  placeholder="Votre budget max en DT ? " 
                style={{marginTop:'10px',width:'49.4%',height:'40px'}} 
                size='sm'
                onChange={(e)=>{setPrice(0);
                setPrice(e.target.value)}}/>
            </div> 
    </div>
    <Button variant="primary" type="submit"
    onClick={(e)=>{
        e.preventDefault();
        dispatch({type:"FILTER",payload:{governate,city,price,maison,appartement}})
        }}>Rechercher</Button>
    </div>
    )
}

export default Filter