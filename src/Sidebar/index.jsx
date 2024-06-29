import React, { useState } from 'react';
import './Sidebar.css';
import { CiSettings } from "react-icons/ci";
import { PiLeaf } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdEmojiPeople } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import Collapsible from 'react-collapsible';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaPersonDigging } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
    const [isManureOpen, setIsManureOpen] = useState(false);

    const toggleManure = () => {
        setIsManureOpen(!isManureOpen);
    };
    return (
        <div className='sidebar'>
            <center>  <img src="/Liyonta_logo.png" /></center><br/>
            <div className='sidebarlist'>


                <ul>
                    <li><Link to="/Dashboard" style={{ display: 'flex' }}><GoHome size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '19px', marginLeft: '15px' }}>Dashboard</p></Link></li>
                    <li><Link to="/leaf-records" style={{ display: 'flex' }}><PiLeaf size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Leaf Records</p></Link></li>
                    <li><Link to="/Agents" style={{ display: 'flex' }}><FaPeopleCarryBox size={22} style={{ color: '#adadad',color: location.pathname === "/Agents" && '#3b5a3b' }} /><p style={{ color: '#adadad',color: location.pathname === "/Agents" && '#3b5a3b', fontSize: '18px', marginLeft: '15px' }}>Agents</p></Link></li>
                    <li><Link to="/Suppliers" style={{ display: 'flex' }}><MdEmojiPeople size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Suppliers</p></Link></li>
                    <li onClick={toggleManure} style={{ display: 'flex', marginLeft: '8px' }}>
                        <p style={{ color: '#adadad', fontSize: '20px' }}>Manure</p><IoIosArrowDown size={22} style={{ color: '#adadad', marginLeft: '15px', marginTop: '3px' }} />
                    </li>
                    <Collapsible open={isManureOpen}>
                        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                            <li><Link to="/Suppliers" style={{ display: 'flex' }}><AiOutlineDollarCircle size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Manure Sales</p></Link></li>
                            <li><Link to="/Manure-type-view" style={{ display: 'flex' }}><FaPersonDigging size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Manure Types</p></Link></li>
                        </ul>
                    </Collapsible>
                    <div style={{ marginTop: '80%' }}>
                        <li><Link to="/Settings" style={{ display: 'flex' }}><CiSettings size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Settings</p></Link></li>
                        <li><Link to="/" style={{ display: 'flex' }}><MdLogout size={22} style={{ color: '#adadad' }} /><p style={{ color: '#adadad', fontSize: '18px', marginLeft: '15px' }}>Log Out</p></Link></li>

                    </div>

                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
