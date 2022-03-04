import React, {  useEffect, useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addPost } from '../../redux/actions/postActions';
import {State,City} from 'country-state-city'
import './AddPost.css'

function AddPost() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errors = useSelector(state => state.authReducer.errors)
  const auth = useSelector(state=>state.authReducer.auth)

  const [locationType, setLocationType] = useState("maison");
  const [surface, setSurface] = useState('')
  const [piecesNbre, setPiecesNbre] = useState('')
  const [meuble, setMeuble] = useState("meublé")
  const [climatisation, setClimatisation] = useState("climatisé")
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [governate, setGovernate] = useState('')
  const [city, setCity] = useState('')
  const [code, setCode] = useState('')
  const [prix, setPrix] = useState(0);
  const [files, setFiles] = useState(null);


  const handleSubmit=(e)=>{
    const data = new FormData()
    e.preventDefault()
    data.append("description", description)
    data.append("locationType", locationType)
    data.append("surface",surface)
    data.append("piecesNbre",piecesNbre)
    data.append("meuble",meuble)
    data.append("climatisation",climatisation)
    data.append("governate",governate)
    data.append("code",code)
    data.append("city",city)
    data.append("location", adresse)
    data.append("price", prix)
    if(files!=null){
      Array.from(files).forEach(file=>data.append("myImages",file))
    }
    dispatch(addPost(data,navigate))
  }

  const handleGovChange = (e) => {
    const {value} = e.target
    setCode(value)
    value===''?setGovernate(''):
    setGovernate(State.getStateByCodeAndCountry(value,'TN').name)
}

  useEffect(() => {
    errors && errors.map(error=>alert(error.msg))
    return ()=>{
      dispatch({type:"CLEARERRORS"})
    }
  }, [errors])

  
  return <div id='addPost'>


 
    <Form>
      {/* locationType checkBox */}
    <Form.Group as={Row} className="mb-3"  >
      <Form.Label column sm={3}>Type de location : </Form.Label>
      <Col sm={6}>
      <Form.Check inline name="locationType" type="radio" label="maison" value="Maison" 
      onChange={(e)=>{setLocationType(e.target.value)}} checked={locationType==="Maison"} />
      <Form.Check inline name="locationType" type="radio" label="appartement" value="Appartement" 
      onChange={(e)=>{setLocationType(e.target.value)}} checked={locationType==="Appartement"} />
      </Col>
    </Form.Group>

      {/* surface Input */}
    <Form.Group as={Row} className="mb-3 form" >
      <Form.Label column sm={3} > Surface : </Form.Label>
      <Col sm={7} >
      <Form.Control type="number" id="surfaceInput" placeholder="entrer la surface en m2 "
      value={surface} onChange={(e)=>setSurface(e.target.value)} />
      </Col>
    </Form.Group>

     {/* Nombre de pieces Input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Nombre de chambres : </Form.Label>
      <Col sm={7}>
      <Form.Select aria-label="Default select example" 
      value={piecesNbre} onChange={(e)=>setPiecesNbre(e.target.value)}>
        <option value="">Selectionner le nombre de chambres</option>
        <option value="Studio">Studio</option>
        <option value="S + 1">S + 1</option>
        <option value="S + 2">S + 2</option>
        <option value="S + 3">S + 3</option>
        <option value="S + 4">S + 4</option>
      </Form.Select>
      </Col>
    </Form.Group>

      {/* autres critères radioBox */}
    <Form.Group as={Row} className="mb-3"  >
      <Form.Label column sm={3}>Autres critères : </Form.Label>
      <Col sm={7}>
        <Form.Group className="mb-3">
          <Form.Check inline name="meuble" type="radio" label="meublé" value="meublé"
          checked={meuble==="meublé"} onChange={(e)=>setMeuble(e.target.value)} />
          <Form.Check inline name="meuble" type="radio" label="non meublé" value="non meublé"
          checked={meuble==="non meublé"} onChange={(e)=>setMeuble(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check inline name="climatisation" type="radio" label="climatisé" value="climatisé"
          checked={climatisation==="climatisé"} onChange={(e)=>setClimatisation(e.target.value)}/>
          <Form.Check inline name="climatisation" type="radio" label="non climatisé" value="non climatisé"
          checked={climatisation==="non climatisé"} onChange={(e)=>setClimatisation(e.target.value)}/>
        </Form.Group>
      </Col>
    </Form.Group>

        {/* description input */}
    <Form.Group as={Row}  className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label column sm={3} >Description du local : </Form.Label>
      <Col sm={7}>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setDescription(e.target.value)} />
      </Col>
    </Form.Group>
        

       {/* governate input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Gouvernorat : </Form.Label>
      <Col sm={7}>
      <Form.Select aria-label="Default select example" 
      value={code} onChange={(e)=>{handleGovChange(e)}}>
        <option value="">Selectionner une gouvernorat</option>
        {State.getStatesOfCountry('TN').map(state=>
          <option value={state.isoCode}>{state.name}</option>)}
      </Form.Select>
      </Col>
    </Form.Group>

      {/* ville input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Ville : </Form.Label>
      <Col sm={7}>
      <Form.Select aria-label="Default select example" 
      value={city} onChange={(e)=>{setCity(e.target.value)}}>
        <option value="">Selectionner une ville</option>
        {City.getCitiesOfState('TN',code).map(el=>
          <option value={el.name}>{el.name}</option>)}
      </Form.Select>
      </Col>
    </Form.Group>

       {/* adresse input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Addresse : </Form.Label>
      <Col sm={7}>
      <Form.Control as="textarea" rows={3} onChange={(e)=>setAdresse(e.target.value)} />
      </Col>
    </Form.Group>

        {/* prix input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Prix : </Form.Label>
      <Col sm={7}>
      <Form.Control type="txt" placeholder="Prix en dinars" onChange={(e)=>setPrix(e.target.value)} />
      </Col>
    </Form.Group>
        
        {/* photos input */}
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm={3} >Photos : </Form.Label>
    <Col sm={7}>
    <Form.Control type="file" onChange={(e)=>setFiles(e.target.files)} multiple="multiple"  />
    </Col>
  </Form.Group>

  <Button variant="primary" type="submit"
  style={{display:'block',marginLeft:'300px'}} 
  onClick={(e)=>{handleSubmit(e)}}>
    Soumettre
  </Button>

</Form>



  </div>;



}

export default AddPost;

