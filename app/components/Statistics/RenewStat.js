import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import moment from "moment";                                /* https://momentjs.com/ */

/* Data collection point at update_member_expiry_date.php */

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
    Resizable,
    styler
} from "react-timeseries-charts";

import { TimeSeries, Index } from "pondjs";

class RenewStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            max: 1
        };
        this.get_StatReview = this.get_StatReview.bind(this);
    }

    componentWillMount(){
        this.get_StatReview();
    }

    render(){

        const series = new TimeSeries({
            name: "RenewStat",
            columns: ["index", "precip"],
            points: this.state.data.map(([d, value]) => [Index.getIndexString("1d", new Date(d)), value])
        });

        var max = this.state.max;

        const Barchart = React.createClass({
            displayName: "BarChartExample",
            getInitialState() {
                return {
                    timerange: series.range()
                };
            },
            handleTimeRangeChange(timerange) {
                this.setState({ timerange });
            },
            render() {
                const style = styler([{ key: "precip", color: "#2462AB"}]);

                return (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Member Renewals</h4>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <Resizable>
                                    <ChartContainer timeRange={this.state.timerange} enablePanZoom={true} onTimeRangeChanged={this.handleTimeRangeChange}>
                                        <ChartRow height="150">
                                            <YAxis
                                                id="rain"
                                                label="Number of New Members"
                                                min={0}
                                                max={max}
                                                format="d"
                                                width="90"
                                                type="linear"
                                            />
                                            <Charts>
                                                <BarChart
                                                    axis="rain"
                                                    style={style}
                                                    spacing={1}
                                                    columns={["precip"]}
                                                    series={series}
                                                />
                                            </Charts>
                                        </ChartRow>
                                    </ChartContainer>
                                </Resizable>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        return(
            <div>
                <Barchart/>
            </div>
        );

    }

    get_StatReview(){
        $.ajax({
            url: '/php/get_StatReview.php',
            type:'POST',
            async: false,
            dataType: "json",
            success : function(response){
                //console.log('get_StatReview Success ' + response);
                this.setupData(response);
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_StatReview Error ' + xhr.responseText);
            }.bind(this)
        });
    }

    setupData(data){
        var tmpData = [];
        var i = 0;
        var max = 1;
        while (i < data.length){
            var count = 1;
            for(var b = i+1; b < data.length && (moment(data[i].RenewDate).format("MMM Do YY") == moment(data[b].RenewDate).format("MMM Do YY"));b++){
                count++;
            }

            if(count > max){
                max = count;
            }
            tmpData.push([data[i].RenewDate, count]);
            i = i + count;
        }
        this.setState({
            data: tmpData,
            max: max
        });
    }
};

export default RenewStat;
