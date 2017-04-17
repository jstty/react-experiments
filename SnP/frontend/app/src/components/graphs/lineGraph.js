import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SvgLine from './svgLine.js'

import style from './lineGraph.css';

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width: 500,
                height: 300
            }
        };
    }

    render() {
        const { capFetch, spFetch } = this.props;
        let { width, height } = this.state.dimensions;
    
        return (
            <div className='lineGraph'>

                <div className='graph'>
                    <svg id='line-chart' width={width} height={height}>
                        <SvgLine 
                            style={style.capLine} 
                            width={width} 
                            height={height} 
                            min={capFetch.data.min} 
                            max={capFetch.data.max} 
                            lineData={capFetch.data.items} />
                        <SvgLine 
                            style={style.spLine} 
                            width={width} 
                            height={height} 
                            min={spFetch.data.min} 
                            max={spFetch.data.max} 
                            lineData={spFetch.data.items} />
                    </svg>
                </div>

                <div className="container legand">
                    <div className="columns">
                        <div className="column col-4"><h5>S & P</h5></div>
                        <div className="column col-8"><div className={style.spLegand}></div></div>
                    </div>
                    <div className="columns">
                        <div className="column col-4"><h5>Capped Product</h5></div>
                        <div className="column col-8"><div className={style.capLegand}></div></div>
                    </div>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state, ownProps) {
    ownProps = !_.isEmpty(ownProps) ? ownProps : {};

    // only if state type from stats
    if(state.Stats) {
        return _.merge(_.cloneDeep(ownProps), state.Stats);
    }
    else {
        return ownProps;
    }
}

export default connect(mapStateToProps)(LineGraph)
