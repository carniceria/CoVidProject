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
        return (
            <footer className="c-footer">
                <span className="text -s -white">
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
