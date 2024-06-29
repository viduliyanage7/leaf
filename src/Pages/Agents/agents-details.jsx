import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { IoSearch } from "react-icons/io5";
import { TextField,Grid,Button } from '@mui/material';

const Agentsdetails = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [phnumber, setPhnumber] = useState('');
  useEffect(() => {
    // Call datasort() whenever items changes
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.post('http://web.liyontatea.com/api/agent_get', { phnumber: phnumber });
      setTableData(response.data); // Assuming response.data is an array of objects from the database
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div><br/>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Phone Number"
            variant="standard"
            fullWidth
            value={phnumber}
            onChange={(e) => setPhnumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
        <Button style={{backgroundColor: 'green',borderRadius:'13px',marginTop:'10px',height:'45px'}} variant="contained" onClick={fetchData}><IoSearch size={22}/></Button>
   
        </Grid></Grid><br/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.contact_number}</TableCell>
              <TableCell>{row.status ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>{row.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Agentsdetails;