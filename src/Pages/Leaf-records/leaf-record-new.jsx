import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Leafrecordnew = (props) => {
  const { handleClicksucess, handleClickerr, setMessage } = props;

  const [supplierId, setSupplierId] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [customdate, setCustomdate] = useState(null);
  const [BW, setBW] = useState('');
  const [waterWeight, setWaterWeight] = useState('');
  const [costWeight, setCostWeight] = useState('');
  const [otherWeight, setOtherWeight] = useState('');
  const dateFormat = 'DD-MM-YYYY';

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!customdate) {
      setMessage('Date field is required');
      handleClickerr();
      return;
    }

    const formattedDate = dayjs(customdate).format(dateFormat);
    const newData = {
      supplier_id: supplierId,
      customdate: formattedDate,
      gross_weight: grossWeight,
      bag_count: bagCount,
      BW: BW,
      water_weight: waterWeight,
      cost_weight: costWeight,
      other_weight: otherWeight,
      // net_weight will be calculated on the server side
    };

    try {
      const response = await axios.post('http://localhost:7705/api/add_leaf_record', newData);
      console.log('Data added successfully:', response.data);
      setSupplierId('');
      setGrossWeight('');
      setBagCount('');
      setCustomdate(null);
      setBW('');
      setWaterWeight('');
      setCostWeight('');
      setOtherWeight('');
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
      <p style={{ fontSize: '30px', marginTop: '0px',fontWeight:'600' }}>Add New Leaf Record</p>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={7}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={customdate}
                onChange={(newValue) => setCustomdate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
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
              label="Gross Weight"
              variant="standard"
              fullWidth
              value={grossWeight}
              onChange={(e) => setGrossWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Bag Count"
              variant="standard"
              fullWidth
              value={bagCount}
              onChange={(e) => setBagCount(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="BW"
              variant="standard"
              fullWidth
              value={BW}
              onChange={(e) => setBW(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Water Weight"
              variant="standard"
              fullWidth
              value={waterWeight}
              onChange={(e) => setWaterWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Cost Weight"
              variant="standard"
              fullWidth
              value={costWeight}
              onChange={(e) => setCostWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              label="Other Weight"
              variant="standard"
              fullWidth
              value={otherWeight}
              onChange={(e) => setOtherWeight(e.target.value)}
            />
          </Grid>
   
          <Grid item xs={7}>
            <Button type="submit" variant="contained" style={{backgroundColor: 'green',borderRadius:'13px',height:'40px'}}>
              Add Record
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Leafrecordnew;
