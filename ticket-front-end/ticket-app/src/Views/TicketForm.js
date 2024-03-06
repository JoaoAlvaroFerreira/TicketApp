import React, { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, FormControl, TextField} from '@mui/material';
import Button from 'react-bootstrap/Button';
import * as k from './../Utils/constants'

function TicketForm() {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [affiliation, setAffiliation] = useState('')
  const [severity, setSeverity] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(`${k.localhost}${k.product_api}${k.get_api}`)
      .then(response => response.json())
      .then(json => setProducts(json))
      .catch(error => console.error(error));
  }, [refresh]);

  function clearFields(){
    setProduct('');
    setSeverity(0)
    setTitle('')
    setDescription('')
    }
  function handleTicket(e) {
    e.preventDefault()
    if (email) {
      fetch(`${k.localhost}${k.ticket_api}${k.insert_api}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: email,
          title: title,
          product: product,
          severity: severity,
          description: description,
          affiliation: affiliation
        }),
      })
        .then((response) => {
          if (response.status == '200') {
            setRefresh(!refresh);
            clearFields()
          }
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div>
      <h2>Ticket Form</h2>
      <form onSubmit={handleTicket}>
        <FormControl>
          <TextField
            label="Title"
            type="TEXT" value={title} onChange={e => setTitle(e.target.value)}
          />
          <FormControl>
          <InputLabel>Product</InputLabel>
          <Select
            value={product}
            onChange={e => setProduct(e.target.value)}>
            {products ? 
            products.map((product) => <MenuItem value={product.product}>{product.product}</MenuItem>) : <MenuItem value='None'>None</MenuItem>}
          </Select>
          </FormControl>
          <TextField
            label="E-Mail"
            type="email" value={email} onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Affiliation"
            value={affiliation}
            onChange={e => setAffiliation(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            multiline
            minRows={8}
            maxRows={12}
            value={description} onChange={e => setDescription(e.target.value)}
          />
          <FormControl>
          <InputLabel>Severity</InputLabel>
          <Select
            value={severity}
            onChange={e => setSeverity(e.target.value)}>
            <MenuItem value={4}>Urgent</MenuItem>
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={2}>Normal</MenuItem>
            <MenuItem value={1}>Lowest</MenuItem>
            <MenuItem value={0}>None</MenuItem>
            </Select>
            </FormControl>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </div>
  )
}

export default TicketForm;