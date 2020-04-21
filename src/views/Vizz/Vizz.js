import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

require('dotenv').config()

require('./Vizz.scss');
const GROUPS = 12;
const LA_VIDA = {
    "nodes": [
        {
          "id": "id1",
          "name": "EUROPA",
          "val": 1
        },
        {
          "id": "id2",
          "name": "ZONA SCHENGEN",
          "val": 2
        },
        {
            "id": "id3",
            "name": "O.M.S.",
            "val": 3
        },
        {
            "id": "id4",
            "name": "EXAMPLE 4",
            "val": 1
          },
          {
            "id": "id5",
            "name": "EXAMPLE 5",
            "val": 2
          },
          {
              "id": "id6",
              "name": "EXAMPLE 6",
              "val": 3
          },
          {
            "id": "id7",
            "name": "EXAMPLE 7",
            "val": 1
          },
          {
            "id": "id8",
            "name": "EXAMPLE 8",
            "val": 2
          },
          {
              "id": "id9",
              "name": "EXAMPLE 9",
              "val": 3
          },
          {
              "id": "id10",
              "name": "EXAMPLE 10",
              "val": 1
            },
            {
              "id": "id11",
              "name": "EXAMPLE 11",
              "val": 2
            },
            {
                "id": "id12",
                "name": "EXAMPLE 12",
                "val": 3
            },
            {
                "id": "id13",
                "name": "EXAMPLE 13",
                "val": 2
              },
              {
                  "id": "id14",
                  "name": "EXAMPLE 14",
                  "val": 3
              },
              {
                "id": "id15",
                "name": "EXAMPLE 15",
                "val": 3
            },
            {
                "id": "id16",
                "name": "EXAMPLE 16",
                "val": 3
            },
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        {
            "source": "id2",
            "target": "id1"
        },
        {
            "source": "id3",
            "target": "id8",
        },
        {
            "source": "id3",
            "target": "id4",
        },
        {
            "source": "id3",
            "target": "id5",
            "curvature": 0.3,
            "rotation": Math.PI * 2 / 3
        },
        {
            "source": "id4",
            "target": "id3"
        },
        {
            "source": "id4",
            "target": "id8"
        },
        {
            "source": "id5",
            "target": "id3"
        },
        {
            "source": "id6",
            "target": "id9"
        },
        {
            "source": "id7",
            "target": "id3"
        },
        {
            "source": "id7",
            "target": "id2"
        },
        {
            "source": "id8",
            "target": "id3"
        },
        {
            "source": "id8",
            "target": "id4"
        },
        {
            "source": "id8",
            "target": "id10"
        },
        {
            "source": "id8",
            "target": "id11"
        },
        {
            "source": "id8",
            "target": "id12"
        },
        {
            "source": "id9",
            "target": "id6"
        },
        {
            "source": "id10",
            "target": "id8"
        },
        {
            "source": "id11",
            "target": "id7"
        },
        {
            "source": "id11",
            "target": "id8"
        },
        {
            "source": "id11",
            "target": "id12"
        },
        {
            "source": "id11",
            "target": "id13"
        },
        {
            "source": "id12",
            "target": "id11"
        },
        {
            "source": "id12",
            "target": "id7"
        },
        {
            "source": "id13",
            "target": "id11"
        },
        {
            "source": "id12",
            "target": "id3"
        },
        {
            "source": "id14",
            "target": "id15"
        },
        {
            "source": "id14",
            "target": "id16"
        },
        {
            "source": "id15",
            "target": "id14"
        },
        {
            "source": "id15",
            "target": "id16"
        },

        {
            "source": "id16",
            "target": "id14"
        },
        {
            "source": "id16",
            "target": "id15"
        },
    ]
}

const FIRST_DAY = moment('10-03-2020');
const LAST_DAY = moment();

class Vizz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSidebarInfo: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => {
              this.setState({
                isLoading: false
              })
          },
          3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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

    buildSliderTime= () => {
        const DIFF_DAYS = 5;
        const diffDates = FIRST_DAY.diff(LAST_DAY, 'days') / DIFF_DAYS;
        const dayList = [...Array(diffDates * DIFF_DAYS).keys()];

        const daysData = dayList.map((v, i) => {
            if(i % DIFF_DAYS === 0) {
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
        const { isLoading } = this.state;

        return (
            <Fragment>
                <Header />
                <div className="l-vizz">
                    {this.buildSliderTime()}
                    {!isLoading &&
                        <div className="l-vizz__container">
                            <ForceGraph3D
                                width={window.innerWidth - 20}
                                height={window.innerHeight - 20}
                                graphData={LA_VIDA}
                                linkColor="white"
                                showNavInfo={false}
                                linkOpacity={1}
                                linkCurvature="curvature"
                                linkCurveRotation="rotation"
                                linkDirectionalParticles={2}
                                nodeAutoColorBy={d => d.val%GROUPS}
                                backgroundColor="#03021B"
                            />
                        </div>
                    }
                    {isLoading &&
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
