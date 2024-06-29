import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoPlus } from "react-icons/go";
import { Input, Select } from 'antd';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { RiEditBoxLine, RiDeleteBinLine } from "react-icons/ri";
import { Button, Grid, IconButton } from '@mui/material';
import { Modal } from 'antd';
import { MdErrorOutline } from "react-icons/md";
const Manuretypeview = (props) => {
    const { handleClicksucess, handleClickerr, setMessage } = props;
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState('');
    const [term, SetTerm] = useState('');
    const [rowcount, setRowcount] = useState(10);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = (row) => {
        setId(row.id)
        setOpen(true);
    };
    const handleChange = async (event) => {
        SetTerm(event.target.value);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/New-manure-type');
    };

    const editClick = (row) => {
        navigate('/New-manure-type', { state: { row } });

    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://web.liyontatea.com/api/manure_type_get');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const deletedata = async () => {
        try {
            const response = await axios.post('http://web.liyontatea.com/api/delete_manure_type', { id });
            if (response.data.message === 'Update successful') {
                setMessage('Record added successfully');
                handleClicksucess();
                handleCancel();
                setTableData([])
                fetchData();
            } else {
                setMessage('Error adding data');
                handleClickerr();
            }
        } catch (error) {
            setMessage('Error sending data to backend');
            handleClickerr();
        }
    };
    const searchdata = async () => {
        try {
            const response = await axios.post('http://web.liyontatea.com/api/manure_type_search', { term });
            setTableData(response.data);
        } catch (error) {
            setMessage('Error sending data to backend');
            handleClickerr();
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
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const indexOfLastItem = currentPage * rowcount;
    const indexOfFirstItem = indexOfLastItem - rowcount;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-green-800 h-16 w-full flex items-center pl-4">
                <p className="text-[20px] text-white mt-0 flex ml-2">Manure Types</p>
            </div>
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <button
                        className='w-[94px] mr-5 h-[40px] rounded-3xl border border-gray-500 text-gray-500 hover:bg-gray-100'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>,
                    <button onClick={deletedata} className='bg-[#B43236] w-[71px] h-[40px] rounded-3xl text-white' >
                        Yes
                    </button>,
                ]}
            >
                <div className='flex'> <MdErrorOutline size={26} className='mt-1 mr-2' /> <p className='text-[20px] mt-[1px]'>Are You Sure ?</p></div>
                <p className='mt-5'>You are trying to delete this record and will not be able to recover them.</p>
                <p className='mt-5 font-semibold'>Do you wish to proceed?</p>
            </Modal>
            <div className="bg-green-800 h-18 -m-2"></div>
            <br />
            <div className="flex justify-center">
                <div className="bg-white mt-12 w-[900px] p-6 rounded-lg">
                    <Grid container spacing={6}>
                        <Grid item xs={4}>
                            <p className="mt-0">Show&nbsp;&nbsp;
                                <Select
                                    options={[
                                        { value: 10, label: '10' },
                                        { value: 2, label: '2' },
                                        { value: 30, label: '30' },
                                    ]}
                                    value={rowcount}
                                    onChange={(value) => setRowcount(value)}
                                    showSearch
                                    defaultValue={10}
                                    optionFilterProp="label"
                                />&nbsp;&nbsp;
                                entries
                            </p>
                        </Grid>
                        <Grid item xs={5} className='flex'>
                            <Input
                                placeholder="Search..."
                                className="h-10"
                                onChange={handleChange}
                                value={term}
                            />
                            <button onClick={searchdata}                         className='w-[54px] ml-5 h-[40px] rounded-xl border border-gray-500 text-gray-500 hover:bg-gray-100'>  <IoSearch className="ml-2 text-gray-600" size={22} /></button>
                        </Grid>
                        <Grid item xs={3}>
                            <button onClick={handleClick} className="items-center justify-center flex ml-100 bg-[#209F20] w-[122px] h-[41px] rounded-md text-white ">
                                <GoPlus size={15} />&nbsp;&nbsp;Add New
                            </button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-white mt-12 w-[900px] p-6 rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><p className='font-semibold'>ID</p></TableCell>
                                <TableCell><p className='font-semibold'>Name</p></TableCell>
                                <TableCell><p className='font-semibold'>Price</p></TableCell>
                                <TableCell><p className='font-semibold'>QTY</p></TableCell>
                                <TableCell align="right"><p className='font-semibold'>Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.price}</StyledTableCell>
                                    <StyledTableCell>{row.qty}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton onClick={() => editClick(row)}>
                                            <RiEditBoxLine size={22} style={{ color: '#3cab3b' }} />
                                        </IconButton>
                                        <IconButton onClick={() => showModal(row)}>
                                            <RiDeleteBinLine size={22} style={{ color: '#ad2c2d' }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <div className="bg-white w-[900px] rounded-lg">
                    <div className="flex justify-center mt-4 mb-4">
                        <Button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                            <p className='text-[#bdbdbd]'>Prev</p>
                        </Button>
                        {Array.from({ length: Math.ceil(tableData.length / rowcount) }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}
                                className={`mt-1 ml-2 mr-2 w-[31px] h-[31px] rounded-lg text-white ${currentPage === index + 1 ? 'bg-[#29CD29]' : 'bg-[#E0E0E0] text-black'}`}>
                                {index + 1}
                            </button>
                        ))}
                        <Button disabled={currentPage === Math.ceil(tableData.length / rowcount)} onClick={() => paginate(currentPage + 1)}>
                            <p className='text-[#bdbdbd]'>Next</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manuretypeview;
