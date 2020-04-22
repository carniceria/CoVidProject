import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Footer } from '../../components/Footer/Footer';
import * as contentful from 'contentful'

require('dotenv').config()
require('./Home.scss');

const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
})

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titleTop: '',
            titleBottom: '',
            description: '',
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => client.getEntries({
        content_type: "homePage",
        limit: 1000
    });

    setPosts = (response) => {
        const dataHome = response.items[0].fields;

        this.setState({
            titleTop: dataHome.topTitle,
            titleBottom: dataHome.bottomTitle,
            description: dataHome.description,
        })
    }

    render() {
        const { titleTop, titleBottom, description } = this.state;

        return (
            <Fragment>
                <div className="l-home">
                    <div className="l-home__container-text">
                        <h2 className="text -uppercase -white -center -xl -bold">{titleTop}</h2>
                        <h1 className="text -uppercase -white -center -xxl -bold">{titleBottom}</h1>
                        <p className="text -uppercase -white -center -s -light">
                            {description}
                        </p>
                    </div>
                    <div className="l-home__container-button">
                        <Link
                            to="/vizz"
                            className="l-home__container-button__button text -uppercase -white -center -l -bold"
                        >
                            <span>ENTRAR</span>
                        </Link>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export { Home };
