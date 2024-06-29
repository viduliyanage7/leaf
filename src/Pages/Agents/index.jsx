import React from 'react';
import { Button, Grid } from '@mui/material';
import { GoPlus } from "react-icons/go";
import { Input } from 'antd';
import { IoSearch } from "react-icons/io5";
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const Agentsindex = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/New-manure-type');
    };

    return (
        <div className="bg-gray-100 min-h-screen" style={{ paddingLeft: '20%', paddingRight: '8%'  }}>
            <div className="bg-green-800 h-18 -m-2"></div>
            <br />
            <div className="flex justify-center" >
                <div className="bg-white mt-12 w-[100%] p-6 rounded-lg" style={{ border: '1px solid #DEDEDE' }}>
                    <Grid container spacing={6}>
                        <Grid item xs={4}>
                            <p className="mt-0">Show&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    defaultValue="10"
                                    optionFilterProp="label"
                                    disabled
                                />&nbsp;&nbsp;
                                entries
                            </p>
                        </Grid>
                        <Grid item xs={5}>
                            <Input
                                placeholder="Search..."
                                className="h-10"
                                prefix={<IoSearch className="text-gray-600" size={18} />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                className="bg-green-700 rounded-lg h-10 w-30"
                                style={{ background: '#209F20', borderRadius: '8px', padding: '12px 20px 12px 20px', boxShadow: 'none' }}
                            >
                                <GoPlus size={22} />&nbsp;&nbsp;Add New
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="flex justify-center mt-12">
                <div className="bg-white mt-12 w-[100%] p-6 rounded-lg">
                    <Grid container spacing={6}>
                        <Grid item xs={4}>
                            <p className="mt-0">Show&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    defaultValue="10"
                                    optionFilterProp="label"
                                    disabled
                                />&nbsp;&nbsp;
                                entries
                            </p>
                        </Grid>
                        <Grid item xs={5}>
                            <Input
                                placeholder="Search..."
                                className="h-10"
                                prefix={<IoSearch className="text-gray-600" size={18} />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                className="bg-green-700 rounded-lg h-10"
                            >
                                <GoPlus size={22} />&nbsp;&nbsp;Add New
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Agentsindex;
