import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Agentsnew = (props) => {
  const { handleClicksucess, handleClickerr, setMessage } = props;

  const [agentsId, setAgentsId] = useState('');
  const [name, setName] = useState('');
  const [phnumber, setPhnumber] = useState('');
  const [status, setStatus] = useState(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    const newData = {
      agents_Id: agentsId,
      name: name,
      phnumber: phnumber,
      status: status ? 1 : 0,
    };

    try {
      const response = await axios.post('http://web.liyontatea.com/api/add_new_agent', newData);
      console.log('Data added successfully:', response.data);
      setAgentsId('');
      setName('');
      setPhnumber('');
      setStatus(true);
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
            <TextField
              label="Agents Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Agents Code"
              variant="standard"
              fullWidth
              value={agentsId}
              onChange={(e) => setAgentsId(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Agents Contact Number"
              variant="standard"
              fullWidth
              value={phnumber}
              onChange={(e) => setPhnumber(e.target.value)}
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

export default Agentsnew;
