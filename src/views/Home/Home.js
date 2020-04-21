import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Footer } from '../../components/Footer/Footer';

require('dotenv').config()

require('./Home.scss');

class Home extends Component {
    render() {
        return (
            <Fragment>
                <div className="l-home">
                    <div className="l-home__container-text">
                        <h2 className="text -uppercase -white -center -xl -bold">Mientras dure</h2>
                        <h1 className="text -uppercase -white -center -xxl -bold">la pandemia</h1>
                        <p className="text -uppercase -white -center -s -light">
                            esta visualización de datos es el resultado de un proyecto
                            de investigación sobre la pandemia
                            covid-19. El estado de alarma. la cuarentena y el impacto
                            que produce sobre
                            <br></br>el cuerpo - la vivienda - la ciudad
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
