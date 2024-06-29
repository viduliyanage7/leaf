import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

const Suppliernew = (props) => {
  const { handleClicksucess, handleClickerr, setMessage } = props;
  const [agents, setAgents] = useState([]);
  const [supplierId, setSupplierId] = useState('');
  const [name, setName] = useState('');
  const [phnumber, setPhnumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8805/api/agent_get', { phnumber: '' });
      console.log(response.data);
      setAgents(response.data); // Assuming response.data is an array of objects from the database
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      supplier_id: supplierId,
      name: name,
      phnumber: phnumber,
      address: address,
      agent_id: selectedAgent,
      status: status ? 1 : 0, 
    };

    try {
      const response = await axios.post('http://localhost:8805/api/add_new_supplier', newData);
      console.log('Data added successfully:', response.data);
      setSupplierId('');
      setName('');
      setPhnumber('');
      setAddress('');
      setSelectedAgent('');
      if (response.data.message === 'successfull') {
        setMessage('Record added successfully');
        handleClicksucess();
      } else {
        setMessage('Error adding data');
        handleClickerr();
      }
    } catch (error) {
      setMessage('Error sending data to backend');
      handleClickerr();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel id="agent-select-label">Select Agent</InputLabel>
              <Select
                labelId="agent-select-label"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                label="Select Agent"
              >
                {agents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>
                    {agent.code}:{agent.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Supplier ID"
              variant="standard"
              fullWidth
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Contact Number"
              variant="standard"
              fullWidth
              value={phnumber}
              onChange={(e) => setPhnumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Address"
              variant="standard"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={7}>
            <Button type="submit" variant="contained" style={{ backgroundColor: 'green', borderRadius: '13px', height: '40px' }}>
              Add Record
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Suppliernew;
