import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Button, Grid, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DatePicker } from 'antd';
import { MdEdit } from "react-icons/md";
import { styled } from '@mui/material/styles';
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

const Leafrecordview = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://web.liyontatea.com/api/leaf_records_get', { date: selectedDate });
      setTableData(response.data);
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
      await axios.post('http://web.liyontatea.com/api/leaf_records_update', editRowData);
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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7fef6',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <p style={{ fontSize: '30px', marginTop: '0px', fontWeight: '600' }}>Leaf Records</p>
        </Grid>
        <Grid item xs={2}>
          <DatePicker
            format="DD-MM-YYYY"
            size={'large'}
            onChange={(date, dateString) => setSelectedDate(dateString)}
            placeholder="Date"
          />
        </Grid>
        <Grid item xs={4}>
          <Button style={{ backgroundColor: 'green', borderRadius: '13px' }} variant="contained" onClick={fetchData}>Search</Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Supplier ID</TableCell>
            <TableCell>Gross Weight</TableCell>
            <TableCell>Bag Count</TableCell>
            <TableCell>BW</TableCell>
            <TableCell>Water Weight</TableCell>
            <TableCell>Cost Weight</TableCell>
            <TableCell>Other Weight</TableCell>
            <TableCell>Net Weight</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.supplier_id}</StyledTableCell>
              <StyledTableCell>{row.gross_weight}</StyledTableCell>
              <StyledTableCell>{row.bag_count}</StyledTableCell>
              <StyledTableCell>{row.BW}</StyledTableCell>
              <StyledTableCell>{row.water_weight}</StyledTableCell>
              <StyledTableCell>{row.cost_weight}</StyledTableCell>
              <StyledTableCell>{row.other_weight}</StyledTableCell>
              <StyledTableCell>{row.net_weight}</StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => handleEditClick(row, index)}>
                  <RiEditBoxLine size={22} style={{color:'#3cab3b'}}/>
                </IconButton>
                <IconButton onClick={() => handleEditClick(row, index)}>
                  <RiDeleteBinLine size={22} style={{color:'#ad2c2d'}}/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="text"
            fullWidth
            value={editRowData?.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Supplier ID"
            type="text"
            fullWidth
            value={editRowData?.supplier_id}
            onChange={(e) => handleInputChange('supplier_id', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Gross Weight"
            type="text"
            fullWidth
            value={editRowData?.gross_weight}
            onChange={(e) => handleInputChange('gross_weight', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Bag Count"
            type="text"
            fullWidth
            value={editRowData?.bag_count}
            onChange={(e) => handleInputChange('bag_count', e.target.value)}
          />
          <TextField
            margin="dense"
            label="BW"
            type="text"
            fullWidth
            value={editRowData?.BW}
            onChange={(e) => handleInputChange('BW', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Water Weight"
            type="text"
            fullWidth
            value={editRowData?.water_weight}
            onChange={(e) => handleInputChange('water_weight', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cost Weight"
            type="text"
            fullWidth
            value={editRowData?.cost_weight}
            onChange={(e) => handleInputChange('cost_weight', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Other Weight"
            type="text"
            fullWidth
            value={editRowData?.other_weight}
            onChange={(e) => handleInputChange('other_weight', e.target.value)}
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

export default Leafrecordview;
