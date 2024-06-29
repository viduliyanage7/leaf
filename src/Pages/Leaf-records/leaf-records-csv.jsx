import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import {Button, Grid } from '@mui/material';
import { MdFileUpload } from "react-icons/md";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const Leafrecordsimportcsv = (props) => {
  const { handleClicksucess, handleClickerr, setMessage } = props;
  const [csvData, setCsvData] = useState([]);
  const [count, setCount] = useState(0);
  const hiddenFileInput = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: function (results) {
          const modifiedData = results.data.map(row => {
            return row.filter((_, index) => index !== 0 && index !== 6 && index !== 7 && index !== 11 && index !== 12);
          });
          setCsvData(modifiedData);
        },
      });
    }
  };

  const sendDataToBackend = () => {
    if (count == 0) {


      axios.post('http://web.liyontatea.com/api/upload', { data: csvData })
        .then(response => {
          if (response.data.message === 'successfully') {
            setCount(1);
            setMessage('CSV imported successfully');
            handleClicksucess();

          } else {
            setMessage('Error importing CSV');
            handleClickerr();
          }
        })
        .catch(error => {
          setMessage('Error sending data to backend');
          handleClickerr();
        });

    } else {
      setMessage('CSV already imported');
      handleClicksucess();
    }

  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div className='leaf-records'>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <p style={{ fontSize: '30px', marginTop: '0px',fontWeight:'600' }}>CSV File Upload</p>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleClick} variant="contained" style={{ backgroundColor: 'green', borderRadius: '13px', height: '35px' }}><MdFileUpload size={20} /></Button>

        </Grid>
        <Grid item xs={2}>
          <Button onClick={sendDataToBackend} variant="contained" style={{ backgroundColor: 'green', borderRadius: '13px', height: '35px' }}>Upload</Button>

        </Grid>
      </Grid>
      <input type="file" accept=".csv" onChange={handleFileUpload} ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
      />
      <br /><br />
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
          </TableRow>
        </TableHead>
        <TableBody>
        {csvData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leafrecordsimportcsv;
