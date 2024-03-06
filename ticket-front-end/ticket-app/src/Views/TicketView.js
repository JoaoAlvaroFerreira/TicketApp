import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import * as k from './../Utils/constants'

function TicketView() {
  const [tickets, setTickets] = useState(null);
  const [devs, setDevs] = useState(null);
  const [products, setProducts] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${k.localhost}${k.ticket_api}${k.get_api}`),
      fetch(`${k.localhost}${k.product_api}${k.get_api}`),
      fetch(`${k.localhost}${k.user_api}${k.get_api}`)
    ])
      .then(([resTickets, resProducts, resUsers]) => 
        Promise.all([resTickets.json(), resProducts.json(), resUsers.json()])
      )
      .then(([dataTickets, dataProducts, dataUsers]) => {
        setTickets(dataTickets)
        setProducts(dataProducts);
        setDevs(dataUsers);
      });
  }, [refresh]);

  const handleAssign = (item, user) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': user })
    };
    fetch(`${k.localhost}${k.ticket_api}/${item}${k.assign_dev}`, requestOptions).then(() => {
      setRefresh(!refresh);
    })
    .catch(error => console.error(error));
  };

  const handleProduct = (item, product) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'product': product })
    };
    fetch(`${k.localhost}${k.ticket_api}/${item}${k.assign_product}`, requestOptions).then(() => {
      setRefresh(!refresh);
    });
  };

  const handleSeverity = (item, severity) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'severity': severity })
    };
    fetch(`${k.localhost}${k.ticket_api}/${item}${k.assign_severity}`, requestOptions).then(() => {
      setRefresh(!refresh);
    })
    .catch(error => console.error(error));
  };

  const handleDelete = (item) => {
    fetch(`${k.localhost}${k.ticket_api}/${item}${k.delete_api}`, {
      method: "DELETE",
    }).then(() => {
      setRefresh(!refresh);
    });
  };

  return (
    <div>
      {tickets ?
        <ul>
          {tickets.map((ticket) => (
            <Card class="card-deck mt-5" variant="outlined" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{ticket.title}</Card.Title>
                <FormControl>
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={ticket.product}
                    onChange={e => handleProduct(ticket._id.$oid, e.target.value)}>
                    {products ?
                      products.map((products) => <MenuItem value={products.product}>{products.product}</MenuItem>) : <MenuItem value='None'>None</MenuItem>}
                  </Select>
                </FormControl>
                <Card.Subtitle className="mb-2 text-muted">Author: {ticket.author}</Card.Subtitle>
                <Card.Text>
                  {ticket.description}
                </Card.Text>
                <FormControl>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    value={ticket.severity}
                    onChange={e => handleSeverity(ticket._id.$oid, e.target.value)}>
                    <MenuItem value={4}>Urgent</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                    <MenuItem value={2}>Normal</MenuItem>
                    <MenuItem value={1}>Lowest</MenuItem>
                    <MenuItem value={0}>None</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Assigned Developer</InputLabel>
                  <Select
                    value={ticket.dev}
                    onChange={e => handleAssign(ticket._id.$oid, e.target.value)}>
                    {devs ?
                      devs.map((devs) => <MenuItem value={devs.email}>{devs.name}</MenuItem>) : <MenuItem value='None'>None</MenuItem>}
                  </Select>
                </FormControl>
                <Button variant="primary" onClick={() => handleDelete(ticket._id.$oid)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </ul>
        : 'Loading...'}
    </div>
  );
}

export default TicketView;