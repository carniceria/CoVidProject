import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import * as contentful from 'contentful';

const ReactMarkdown = require('react-markdown')

require('dotenv').config()

require('./Header.scss');

const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleContent: '',
            peopleContent: null,
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => client.getEntries({
        content_type: "infoContent",
        limit: 1000
    });

    setPosts = (response) => {
        const fields = response.items[0].fields

        this.setState({
            titleContent: fields.textInfoModal,
            peopleContent: fields.people,
        })
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

    buildInfoPeople = () => {
        const { peopleContent } = this.state;

        return peopleContent.map(({fields}, i) => {
            return (
                <div className="c-header-sidebar-info__content-people">
                    <div className="c-header-sidebar-info__image-people" style={{backgroundImage: `url(${fields.image.fields.file.url})`}}></div>
                    <div className="text -white">
                        <ReactMarkdown source={fields.description} />
                    </div>
                </div>
            )
        })
    }


    buildInfoSideBar = () => {
        const { showSidebarInfo, titleContent, peopleContent } = this.state;

        return (
            <div className={`c-header-sidebar-info ${showSidebarInfo && '-open'}`}>
                <h2 className="text -white -bold -m -uppercase c-header-sidebar-info__title">Info</h2>
                <p className="text -white">
                    <ReactMarkdown source={titleContent} />
                </p>
                <h2 className="text -white -bold -m -uppercase c-header-sidebar-info__title -about-us">About Us</h2>
                {
                    peopleContent && this.buildInfoPeople()
                }
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
