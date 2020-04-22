import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

require('dotenv').config()

require('./Header.scss');

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSidebarInfo: false,
        }
    }

    handleShowInfo = () => {
        const { showSidebarInfo } = this.state;

        this.setState({
            showSidebarInfo: !showSidebarInfo
        })
    }

    buildBackgroundCloseInfoSideBar = () => {
        const { showSidebarInfo } = this.state;

        if(showSidebarInfo) {
            return (
                <div className="c-header-sidebar-info-back" onClick={() => this.handleShowInfo()}>
                    {}
                </div>
            )
        }
    }

    buildInfoSideBar = () => {
        const { showSidebarInfo } = this.state;

        return (
            <div className={`c-header-sidebar-info ${showSidebarInfo && '-open'}`}>
                <h2 className="text -white -bold -m -uppercase c-header-sidebar-info__title">Info</h2>
                <p className="text -white">
                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                    ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                    lorem ipsum ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                    ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                    ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                </p>
            </div>
        )
    }

    render() {
        const { black } = this.props;
        const colorMenu = black ? '-black' : '-white';

        return (
            <Fragment>
                {this.buildBackgroundCloseInfoSideBar()}
                {this.buildInfoSideBar()}
                <header className="c-header">
                    <div className={`text  -bold -m -uppercase cursor-pointer ${colorMenu}`} onClick={() => this.handleShowInfo()}>
                        info
                    </div>
                    <Link to="/hypertext" className={`text  -bold -m -uppercase cursor-pointer ${colorMenu}`}>
                        hipertexto
                    </Link>
                </header>
            </Fragment>
        );
    }
}

export { Header };
