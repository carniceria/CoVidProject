import React, { Component, Fragment } from 'react';
import moment from 'moment';
import * as contentful from 'contentful';

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import printIcon from '../../assets/icons/MENU_print_line.svg';
import layerIcon from '../../assets/icons/MENU_layers_line.svg';
import tagIcon from '../../assets/icons/MENU_tag_line.svg';

import { GROUPS, DIFF_DAYS } from '../../constants/data';


const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
})


require('dotenv').config()

require('./Vizz.scss');

const FIRST_DAY = moment('10-03-2020');
const LAST_DAY = moment();

class Vizz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSidebarInfo: false,
            isLoading: true,
            data: null
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => client.getEntries({
        content_type: "vizzData",
        limit: 1000
    });

    setPosts = (response) => {
        console.log(response, 'RESPOOOONSE');

        const dataHome = response.items[0].fields;

        this.setState({
            data: dataHome.data,
        })
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //       () => {
    //           this.setState({
    //             isLoading: false
    //           })
    //       },
    //       3000
    //     );
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }

    handleShowInfo = () => {
        const { showSidebarInfo } = this.state;

        this.setState({
            showSidebarInfo: !showSidebarInfo
        })
    }

    buildLinesSliderTime = (daysData, space) => {
        return daysData.map((v, i) => {
            return (
                <div className="l-vizz__slider-time__line" style={{marginTop: `${space}px`}}>
                    <span className="l-vizz__slider-time__line__text text -xs -white -light">
                        {v.dayText}
                    </span>
                </div>
            )
        })
    }

    buildButtonsFooter = () => {
        return (
            <div className="l-vizz__container__footer-filters">
                <div>
                    <img src={tagIcon} />
                </div>
                <div>
                    <img src={layerIcon} />
                </div>
                <div>
                    <img src={printIcon} />
                </div>
            </div>
        )
    }

    buildSliderTime= () => {
        const diffDates = FIRST_DAY.diff(LAST_DAY, 'days') / DIFF_DAYS;
        const completeDiffDates = FIRST_DAY.diff(LAST_DAY, 'days');
        const dayList = [...Array(diffDates * DIFF_DAYS).keys()];

        const daysData = dayList.map((v, i) => {
            if (i % DIFF_DAYS === 0) {
                return (
                    {
                        dayText: moment('10-03-2020').add(i, 'days').format('DD/MM'),
                        isFirstDay: moment('10-03-2020').format('DD') === '01'
                    }
                )
            }
        })

        return (
            <div className="l-vizz__container-left">
                <div className="l-vizz__controls">

                </div>
                <div className="l-vizz__slider-time">
                    {this.buildLinesSliderTime(daysData.filter(Boolean), ((window.innerHeight - 170) / daysData.filter(Boolean).length) - 1)}
                </div>
            </div>
        )
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <Header />
                <div className="l-vizz">
                    {this.buildSliderTime()}
                    {data &&
                        <Fragment>
                            <div className="l-vizz__container">
                                <ForceGraph3D
                                    width={window.innerWidth - 20}
                                    height={window.innerHeight - 20}
                                    graphData={data}
                                    linkColor="white"
                                    showNavInfo={false}
                                    linkOpacity={1}
                                    linkCurvature="curvature"
                                    linkCurveRotation="rotation"
                                    linkDirectionalParticles={2}
                                    nodeAutoColorBy={d => d.val%GROUPS}
                                    backgroundColor="#03021B"
                                />
                                {this.buildButtonsFooter()}
                            </div>
                        </Fragment>
                    }
                    {!data &&
                        <Fragment>
                            <h1 className="text -white -xl -bold l-vizz__loading">cooking everything</h1>
                        </Fragment>
                    }

                </div>
                <Footer />
            </Fragment>
        );
    }
}

export { Vizz };
