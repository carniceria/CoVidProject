import React, { Component, Fragment } from 'react';
import moment from 'moment';
import * as contentful from 'contentful';

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import printIcon from '../../assets/icons/MENU_print_line.svg';
import layerIcon from '../../assets/icons/MENU_layers_line.svg';
import tagIcon from '../../assets/icons/MENU_tag_line.svg';
import printIconWhite from '../../assets/icons/MENU_print_solid.svg';
import layerIconWhite from '../../assets/icons/MENU_layers_solid.svg';
import tagIconWhite from '../../assets/icons/MENU_tag_solid.svg';

import playIcon from '../../assets/icons/TIMELINE_play.svg'
import pauseIcon from '../../assets/icons/TIMELINE_pause.svg';
import nextIcon from '../../assets/icons/TIMELINE_day_after.svg';
import lastIcon from '../../assets/icons/TIMELINE_day_before.svg';
import indicatorIcon from '../../assets/icons/TIMELINE_indicator.svg';

import { GROUPS, DIFF_DAYS, DEMO } from '../../constants/data';


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
            data: null,
            printWhite: false,
            layerWhite: false,
            tagWhite: false,
            pauseVideo: true,
            numberDays: 0
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
        const dataHome = response.items[0].fields.data;
        const copyData = {...dataHome, mama: [{hola: "pepe"}]}
        let arrayLinks = [];

        dataHome.nodes.map((v, i) => {
            v.links.replace(/\s/g, '').split(',').map((value) => {
                arrayLinks.push({
                    source: v.id,
                    target: 'id'+value,
                })
            })
        })

        copyData.copyLink = arrayLinks;

        this.setState({
            data: {nodes: dataHome.nodes, links: [...copyData.copyLink]},
        })
    }

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

    enterButtonsFooter = (type) => {
        if (type === 'tag') {
            this.setState({
                tagWhite: true
            })
        } else if (type === 'layer'){
            this.setState({
                layerWhite: true
            })
        } else if (type === 'print') {
            this.setState({
                printWhite: true
            })
        }
    }

    leaveButtonsFooter = (type) => {
        if (type === 'tag') {
            this.setState({
                tagWhite: false
            })
        } else if (type === 'layer'){
            this.setState({
                layerWhite: false
            })
        } else if (type === 'print') {
            this.setState({
                printWhite: false
            })
        }
    }

    buildButtonsFooter = () => {
        const { tagWhite, layerWhite, printWhite } = this.state;

        return (
            <div className="l-vizz__container__footer-filters">
                <div
                    className="l-vizz__container__footer-filters__image-container"
                    onMouseEnter={() => this.enterButtonsFooter('tag')}
                    onMouseLeave={() => this.leaveButtonsFooter('tag')}
                >
                    <img className="pointer" src={tagWhite ? tagIconWhite : tagIcon} />
                </div>
                <div
                    className="l-vizz__container__footer-filters__image-container"
                    onMouseEnter={() => this.enterButtonsFooter('layer')}
                    onMouseLeave={() => this.leaveButtonsFooter('layer')}
                >
                    <img className="pointer" src={layerWhite ? layerIconWhite : layerIcon} />
                </div>
                <div
                    className="l-vizz__container__footer-filters__image-container"
                    onMouseEnter={() => this.enterButtonsFooter('print')}
                    onMouseLeave={() => this.leaveButtonsFooter('print')}
                >
                    {printWhite && <span className="text -white -bold -xs -uppercase l-vizz__container__footer-filters__print-text">Imprimir</span>}
                    <img className="pointer" src={printWhite ? printIconWhite : printIcon} />
                </div>
            </div>
        )
    }

    handleTimeLine = () => {
        const { pauseVideo } = this.state;

        this.setState({
            pauseVideo: !pauseVideo,
        })
    }

    buildSliderTime= () => {
        const { pauseVideo, numberDays } = this.state;
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

        if (numberDays === 0) {
            this.setState({
                numberDays: dayList.length,
            })
        } else {
            return (
                <div className="l-vizz__container-left">
                    <div className="l-vizz__controls">
                        <img src={lastIcon} />
                        <img onClick={() => this.handleTimeLine()} src={pauseVideo ? playIcon : pauseIcon} />
                        <img src={nextIcon} />
                    </div>
                    <div className="l-vizz__slider-time">
                        <div className="l-vizz__slider-time__triangle"></div>
                        {this.buildLinesSliderTime(daysData.filter(Boolean), ((window.innerHeight - 190) / daysData.filter(Boolean).length) - 1)}
                    </div>
                </div>
            )
        }
    }

    showTitle = (dataNode) => {
        console.log(dataNode);
    }

    render() {
        const { data, showData } = this.state;

        return (
            <Fragment>
                <Header />
                <div className="l-vizz">
                    {this.buildSliderTime()}
                    {data &&
                        <Fragment>
                            <div className="l-vizz__container" id="my-node">
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
                                    backgroundColor="#03021B"
                                    nodeResolution={25}
                                    nodeAutoColorBy={d => data.nodes[d.source].color}
                                    onNodeHover={this.showTitle}
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
