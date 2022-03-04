import React from 'react'
import { Card } from 'react-bootstrap'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
<Card className="text-center" style={{height:'200px'}}>
<Card.Body className='card' >
    <Card.Title>My Project</Card.Title>
    <Card.Text>
    Copyright &copy;My Project
    </Card.Text>
</Card.Body>
</Card>
    </div>
  )
}

export default Footer