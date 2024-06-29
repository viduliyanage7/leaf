import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Leafrecordsindex from './Pages/Leaf-records';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Leafrecordsimportcsv from './Pages/Leaf-records/leaf-records-csv';
import Suppliersindex from './Pages/Suppliers';
import Agentsindex from './Pages/Agents';
import Newmanuretype from './Pages/Manure/new-manure-type';
import Manuretypeview from './Pages/Manure/manure-type-view';


function App() {
  const [opensucess, Opensucess] = React.useState(false);
  const [openerr, Openerr] = React.useState(false);
  const [message, setMessage] = useState('');

  const handleClicksucess = () => {
    Opensucess(true);
    setTimeout(() => {
      Opensucess(false);
    }, 3000);
  };

  const handleClosesucess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    Opensucess(false);
  };

  const handleClickerr = () => {
    Openerr(true);
    setTimeout(() => {
      Openerr(false);
    }, 3000);
  };

  const handleCloseerr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    Openerr(false);
  };

  return (
    <BrowserRouter>
      <div className="appmaindiv">
<Sidebar/>
        <div className="content">
          <Routes>
            <Route path="/leaf-records" element={<Leafrecordsindex setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />} />
            <Route path="/Suppliers" element={<Suppliersindex setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />} />
            <Route path="/Agents" element={<Agentsindex setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />} />
            <Route path="/New-manure-type" element={<Newmanuretype setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />} />
            <Route path="/Manure-type-view" element={<Manuretypeview setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />} />
            

          </Routes>
        </div>
        <center>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            className="alertmain"
            open={opensucess}
            onClose={handleClosesucess}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            </Stack>
          </Snackbar>
        </center>
        <center>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            className="alertmain"
            open={openerr}
            onClose={handleCloseerr}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert variant="filled" severity="error">
                {message}
              </Alert>
            </Stack>
          </Snackbar>
        </center>
      </div>
    </BrowserRouter>
  );
}

export default App;
