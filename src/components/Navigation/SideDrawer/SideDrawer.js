import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxh'

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer','Close'];
    if(props.open){
        attachedClasses = ['SideDrawer','Open']
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className="LogoContainer">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;