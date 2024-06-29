import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Grid, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IoSearch } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const Supplierdetails = () => {
  const [tableData, setTableData] = useState([]);
  const [phnumber, setPhnumber] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8805/api/suppliers_get', { phnumber: phnumber });
      setTableData(response.data);
      console.log(response.data) // Assuming response.data is an array of objects from the database
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (row, index) => {
    setEditRowData({ ...row });
    setEditRowIndex(index);
    setEditDialogOpen(true);
  };

  const handleInputChange = (field, value) => {
    setEditRowData({ ...editRowData, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:8805/api/leaf_records_update', editRowData);
      const updatedTableData = [...tableData];
      updatedTableData[editRowIndex] = editRowData;
      setTableData(updatedTableData);
      setEditDialogOpen(false);
      alert('Record updated successfully!');
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Failed to update record.');
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
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>created_at</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.created_at}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.agent_name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(row, index)}>
                  <MdEdit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editRowData?.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Contact"
            type="text"
            fullWidth
            value={editRowData?.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={editRowData?.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Agent Name"
            type="text"
            fullWidth
            value={editRowData?.agent_name}
            onChange={(e) => handleInputChange('agent_name', e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Supplierdetails;
