import React, { Component } from 'react'
import Aux from '../Auxh'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true })
    }

    render() {
        return (
            <Aux>
                <Toolbar  open = {this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux >
        );
    }

}

export default Layout;