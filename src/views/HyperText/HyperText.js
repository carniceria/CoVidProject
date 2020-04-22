import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import * as contentful from 'contentful'

require('dotenv').config()
require('./HyperText.scss');

const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

class HyperText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            subTitle: '',
            text: '',
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => client.getEntries({
        content_type: "hyperTextPage",
        limit: 1000
    });

    setPosts = (response) => {
        const dataHome = response.items[0].fields;

        this.setState({
            title: dataHome.title,
            subTitle: dataHome.subTitle,
            text: dataHome.text,
        })
    }


    render() {
        const { title, subTitle, text } = this.state;

        return (
            <Fragment>
                <Header black/>
                <div className="l-hypertext">
                    <h1 className="text -black -l -center l-hypertext__title">{title}</h1>
                    <span className="text -black -s -center l-hypertext__subtitle">{subTitle}</span>
                    <div className="text -black -m l-hypertext__text">
                        {text}
                    </div>
                </div>
                <Footer black/>
            </Fragment>
        );
    }
}

export { HyperText };
