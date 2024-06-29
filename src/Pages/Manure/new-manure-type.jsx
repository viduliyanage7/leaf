import React, { useState, useEffect } from 'react';
import { StackPlus, Plus } from '@phosphor-icons/react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Newmanuretype = (props) => {
    const { handleClicksucess, handleClickerr, setMessage } = props;
    const location = useLocation();
    const { row } = location.state || {};
    const [id, setId] = useState('');
    const [manurename, setManurename] = useState('');
    const [manureprice, setManureprice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [bttext, setBttext] = useState('');
    useEffect(() => {
        try {
            if (row.id > 0) {
                setId(row.id)
                setManurename(row.name)
                setManureprice(row.price)
                setQuantity(row.qty)
                setBttext('Update')
            }
        } catch {
            setBttext('Add')
        }
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();


        const newData = {
            id: id,
            manurename: manurename,
            quantity: quantity,
            manureprice: manureprice,
        };
        if (id > 0) {
            try {
                const response = await axios.post('http://web.liyontatea.com/api/update_manure_type', newData);
                console.log(response.data.message)
                if (response.data.message === 'Update successful') {
                    setMessage('Record added successfully');
                    handleClicksucess();
                } else {
                    setMessage('Error adding data');
                    handleClickerr();
                }
            } catch (error) {
                setMessage('Error sending data to backend');
                handleClickerr();
            }
        } else {
            try {
                const response = await axios.post('http://web.liyontatea.com/api/add_new_manure_type', newData);
                if (response.data.message === 'successfull') {
                    setMessage('Record added successfully');
                    handleClicksucess();
                } else {
                    setMessage('Error adding data');
                    handleClickerr();
                }
            } catch (error) {
                setMessage('Error sending data to backend');
                handleClickerr();
            }
        }
        setManurename('');
        setManureprice('');
        setQuantity('');
        setId('')
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Manure-type-view');
    };
    return (
        <div className="bg-gray-100 w-full h-full flex flex-col">
            <div className="bg-green-800 h-16 w-full flex items-center pl-4">
                <IoArrowBackCircleOutline onClick={handleClick} size={32} className='text-white' />
                <p onClick={handleClick} className="text-[20px] text-white mt-0 flex ml-2">Manure Types</p>
                <FaChevronRight size={22} className='text-white ml-2' />
                <p className="text-[20px] text-white mt-0 flex ml-2">Add New</p>
            </div>
            <div className="flex-grow flex justify-center items-center p-8">
                <div className="bg-white p-8 rounded shadow w-[832px] h-[593px]">
                    <div className='flex'>
                        <StackPlus size={28} />
                        <p className='text-[20px] ml-3'>Add New Manure Type</p>
                    </div>
                    <p className='text-[14px] mb-5 mt-2 ml-2 text-[#6F7482]'>Please fill in the details below to add a new manure type.</p>
                    <hr />

                    <div className='mb-10 mt-10'>
                        <p >Manure Type</p>
                        <Input
                            value={manurename}
                            onChange={(e) => setManurename(e.target.value)}
                            size="large" className='mt-5 mb-5' placeholder="Name" />

                        <p>Price</p>
                        <Input
                            value={manureprice}
                            onChange={(e) => setManureprice(e.target.value)}
                            size="large" className="mt-5 mb-5" placeholder="Price" />

                        <p>Quantity</p>
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            size="large" className="mt-5" placeholder="Quantity" />

                    </div>
                    <hr />
                    <div className='grid justify-items-stretch'>
                        <button onClick={handleFormSubmit} className="mt-5 flex ml-100 items-center justify-center justify-self-end bg-[#209F20] w-[102px] h-[41px] rounded-md text-white ">
                            <FaPlus size={15} />&nbsp;&nbsp;{bttext}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newmanuretype;
