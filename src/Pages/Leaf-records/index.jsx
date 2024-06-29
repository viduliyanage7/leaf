import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Leafrecordsimportcsv from './leaf-records-csv';
import Leafrecordview from './leaf-record-view';
import Leafrecordnew from './leaf-record-new';

const Leafrecordsindex = (props) => {
    const { setMessage, handleClicksucess, handleClickerr } = props;

    const [tabValue, setTabValue] = useState(0); // State to manage active tab

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div style={{marginLeft:'300px'}}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Leaf Records Tabs">
                <Tab label="Leaf Records" />
                <Tab label="Add New Leaf Record" />
                <Tab label="Import CSV" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Leafrecordview />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Leafrecordnew setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Leafrecordsimportcsv setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />
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

export default Leafrecordsindex;
