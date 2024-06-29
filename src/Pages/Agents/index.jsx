import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Agentsdetails from './agents-details';
import Agentsnew from './agents-new';

const Agentsindex = (props) => {
    const { setMessage, handleClicksucess, handleClickerr } = props;

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div><br/>
             <p style={{ fontSize: '30px', marginTop: '0px',fontWeight:'600' }}>Agents</p>
    
            <Tabs  value={tabValue} onChange={handleTabChange} aria-label="Leaf Records Tabs">
                <Tab label="Agent Details" />
                <Tab label="Add New Agent" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Agentsdetails />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Agentsnew setMessage={setMessage} handleClicksucess={handleClicksucess} handleClickerr={handleClickerr} />
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

export default Agentsindex;
