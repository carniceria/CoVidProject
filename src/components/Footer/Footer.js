import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

require('dotenv').config()

require('./Footer.scss');

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { black } = this.props;
        const colorMenu = black ? '-black' : '-white';

        return (
            <footer className="c-footer">
                <span className={`text -s ${colorMenu}`}>
                    proudly baked by{' '}
                    <b>carnicería</b>{' '}
                    as a research{' '}
                    <b>hypermedia</b>
                </span>
            </footer>
        );
    }
}

export { Footer };
