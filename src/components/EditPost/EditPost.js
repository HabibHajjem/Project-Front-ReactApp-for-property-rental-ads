import { City, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePhoto, editPost, getPostById } from '../../redux/actions/postActions';
import './EditPost.css'

function EditPost() {
const {id} = useParams()
const navigate = useNavigate()
const dispatch = useDispatch()
const post = useSelector(state=>state.postReducer.post)
const loading = useSelector(state=>state.postReducer.loading)

const [locationType, setLocationType] = useState('');
const [surface, setSurface] = useState(0)
const [piecesNbre, setPiecesNbre] = useState('')
const [meuble, setMeuble] = useState('')
const [climatisation, setClimatisation] = useState('')
const [description, setDescription] = useState('');
const [location, setLocation] = useState('');
const [governate, setGovernate] = useState('')
const [city, setCity] = useState('')
const [code, setCode] = useState('')
const [price, setPrice] = useState(0);
const [files,setFiles] = useState(null)

const handleSubmit = () =>{
  let data = new FormData()
  data.append("description", description)
  data.append("locationType", locationType)
  data.append("surface",surface)
  data.append("piecesNbre",piecesNbre)
  data.append("meuble",meuble)
  data.append("climatisation",climatisation)
  data.append("governate",governate)
  data.append("code",code)
  data.append("city",city)
  data.append("location", location)
  data.append("price", price)
  if(files){
    Array.from(files).forEach(file=>data.append("myImages",file))
  }
  dispatch(editPost(id,data,navigate))
}

const handleGovChange = (e) => {
  const {value} = e.target
  setCode(value)
  value===''?setGovernate(''):
  setGovernate(State.getStateByCodeAndCountry(value,'TN').name)
}

    useEffect(() => {
        dispatch(getPostById(id))  
        if(!loading){
        setLocationType(post.locationType)
        setSurface(post.surface)
        setPiecesNbre(post.piecesNbre)
        setMeuble(post.meuble)
        setClimatisation(post.climatisation)
        setDescription(post.description)
        setGovernate(post.governate)
        setCode(post.code)
        setCity(post.city)
        setLocation(post.location)
        setPrice(post.price)
        }
    }, [loading]);
    
  return <div id='editPostBloc'>
      {loading?null:
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
        <Form.Control as="textarea" rows={3} value={description} 
        onChange={(e)=>setDescription(e.target.value)} />
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
        
        {/* location input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Localité : </Form.Label>
      <Col sm={7}>
      <Form.Control type="txt" value={location} placeholder="entrer la localité" 
      onChange={(e)=>setLocation(e.target.value)}/>
      </Col>
    </Form.Group>

        {/* prix input */}
    <Form.Group as={Row} className="mb-3" >
      <Form.Label column sm={3} > Prix : </Form.Label>
      <Col sm={7}>
      <Form.Control type="txt" value={price} placeholder="Prix en dinars" onChange={(e)=>setPrice(e.target.value)} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
    <Form.Label column sm={3} >Ajouter des photos : </Form.Label>
    <Col sm={7}>
    <Form.Control type="file" onChange={(e)=>setFiles(e.target.files)} multiple="multiple"  />
    </Col>
  </Form.Group>

  <Button style={{display:'block', margin:'auto', width:'100px'}}  
    onClick={()=>handleSubmit()}>Soumettre</Button>

           {/* photos */}
    <Form.Group className="mb-3" >
    <Form.Label column sm={3} >Supprimer des photos : </Form.Label>
      <div id='imagesBloc'>
      {post && post.imagesUrl.map(url=>
        <div style={{width:'30%'}}>
        <Card.Img variant="top" style={{width:'100%', height:'200px'}} 
        src={`../uploads/${url}`} /><br/>
        <button 
        style={{display:'block',margin:'auto',marginTop:'10px'}}
        onClick={()=>{dispatch(deletePhoto(post._id,{photoName:url}))}}>
        <i class="bi bi-trash"></i>
        </button>
        </div>)}
        </div>
    </Form.Group>
    </Form>}
    
      
  </div>;
}

export default EditPost;
