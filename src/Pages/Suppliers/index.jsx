import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Supplierdetails from './supplier-details';
import Suppliernew from './supplier-new';

const Suppliersindex = (props) => {
    const { setMessage, handleClicksucess, handleClickerr } = props;

    const [tabValue, setTabValue] = useState(0); // State to manage active tab

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div><br/>
             <p style={{ fontSize: '30px', marginTop: '0px',fontWeight:'600' }}>Supplier</p>
    
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Leaf Records Tabs">
                <Tab label="Supplier Details" />
                <Tab label="Add New Supplier" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Supplierdetails />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Suppliernew setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />
            </TabPanel>
        </div>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tab-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default Suppliersindex;
