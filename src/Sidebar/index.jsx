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
import { House, Leaf, UsersThree, Handshake, CurrencyCircleDollar, Shovel, CaretDown } from "@phosphor-icons/react";

const Sidebar = () => {
    const [isManureOpen, setIsManureOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleManure = () => {
        setIsManureOpen(!isManureOpen);
    };

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const getLinkStyle = (item) => ({
        display: 'flex',
        textDecoration: 'none',
        color: hoveredItem === item ? '#3B5A3B' : '#adadad',
        transition: 'color 0.3s ease'
    });

    const getTextStyle = (item) => ({
        fontSize: '16px',
        marginLeft: '15px',
        color: hoveredItem === item ? '#3B5A3B' : '#adadad',
        transition: 'color 0.3s ease'
    });

    return (
        <div className='sidebar'>
            <center> <img src="src/Images/logo.png" alt="Liyonta Logo" /></center><br />
            <div className='sidebarlist'>
                <ul>
                    <li>
                        <Link to="/Dashboard" 
                            style={getLinkStyle('Dashboard')}
                            onMouseEnter={() => handleMouseEnter('Dashboard')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <House size={24} />
                            <p style={getTextStyle('Dashboard')}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/leaf-records"
                            style={getLinkStyle('Leaf Records')}
                            onMouseEnter={() => handleMouseEnter('Leaf Records')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Leaf size={24} />
                            <p style={getTextStyle('Leaf Records')}>Leaf Records</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Agents"
                            style={{
                                ...getLinkStyle('Agents'),
                                color: location.pathname === "/Agents" ? '#3B5A3B' : getLinkStyle('Agents').color
                            }}
                            onMouseEnter={() => handleMouseEnter('Agents')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <UsersThree size={24} />
                            <p style={getTextStyle('Agents')}>Agents</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Suppliers"
                            style={getLinkStyle('Suppliers')}
                            onMouseEnter={() => handleMouseEnter('Suppliers')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Handshake size={24} />
                            <p style={getTextStyle('Suppliers')}>Suppliers</p>
                        </Link>
                    </li>
                    <li
                        onClick={toggleManure}
                        style={{ display: 'flex', marginLeft: '8px' }}
                        onMouseEnter={() => handleMouseEnter('Manure')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p style={getTextStyle('Manure')}>Manure</p>
                        <CaretDown size={24} style={{ marginLeft: '15px', marginTop: '3px', color: hoveredItem === 'Manure' ? '#3B5A3B' : '#adadad' }} />
                    </li>
                    <Collapsible open={isManureOpen}>
                        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                            <li>
                                <Link to="/Suppliers"
                                    style={getLinkStyle('Manure Sales')}
                                    onMouseEnter={() => handleMouseEnter('Manure Sales')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <CurrencyCircleDollar size={24} />
                                    <p style={getTextStyle('Manure Sales')}>Manure Sales</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Manure-type-view"
                                    style={getLinkStyle('Manure Types')}
                                    onMouseEnter={() => handleMouseEnter('Manure Types')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Shovel size={24} />
                                    <p style={getTextStyle('Manure Types')}>Manure Types</p>
                                </Link>
                            </li>
                        </ul>
                    </Collapsible>
                    <div style={{ marginTop: '80%' }}>
                        <li>
                            <Link to="/Settings"
                                style={getLinkStyle('Settings')}
                                onMouseEnter={() => handleMouseEnter('Settings')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <CiSettings size={22} />
                                <p style={getTextStyle('Settings')}>Settings</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/"
                                style={getLinkStyle('Log Out')}
                                onMouseEnter={() => handleMouseEnter('Log Out')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <MdLogout size={22} />
                                <p style={getTextStyle('Log Out')}>Log Out</p>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;