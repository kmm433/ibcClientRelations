import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import NoticeSurvey from './NoticeSurvey.js';


class LinkSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SurveyID: "",
            title: ""
        };
        this.confirmUser = this.confirmUser.bind(this);
    }

    componentWillMount(){
        console.log("MOUNTING");
        this.setState({
            SurveyID: this.props.match.params.SurveyID
        });
        confirmUser()
    }

    confirmUser(){

    }

    render(){
        return(
            <div id="notice-board">
                <div>
                    <NoticeSurvey
                        key={this.state.SurveyID}
                        SurveyID={this.state.SurveyID}
                        title={this.state.title}
                    />
                </div>
            </div>
        );
    }
};

export default LinkSurvey;
