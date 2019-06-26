import React from 'react';
import './Toolbar.css'
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.open} />
        <Logo height="80%" />
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;

