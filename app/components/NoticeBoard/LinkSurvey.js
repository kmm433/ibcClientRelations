import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import NoticeSurvey from './NoticeSurvey.js';


class LinkSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SurveyID: "",
            title: "",
            DatePosted: ""
        };
        this.confirmUser = this.confirmUser.bind(this);
    }

    componentWillMount(){
        this.setState({
            SurveyID: this.props.match.params.SurveyID
        });
        this.confirmUser()
    }

    confirmUser(){
        $.ajax({
            url: '/php/get_UserConfirmSurvey.php',
            type:'POST',
            dataType: "json",
            data:{
                'SurveyID': this.props.match.params.SurveyID
            },
            success : function(response){
                if(response.length != 0){
                    this.setState({
                        title: response[0].SurveyTitle,
                        DatePosted: response[0].DatePosted
                    });
                }
            }.bind(this)
        });
    }

    render(){

        var renderThis = "";
        if (this.state.title != ""){
            renderThis = <NoticeSurvey
                key={this.state.SurveyID}
                SurveyID={this.state.SurveyID}
                title={this.state.title}
                DatePosted={this.state.DatePosted}
            />
        } else {
            renderThis = <div style={{textAlign:'center',marginLeft: '25px',marginTop:'25%'}}><h4>Theres nothing here! Its possible the survey you are looking for has been deleted, or you don't have permission to view it</h4></div>
        }

        return(
            <div id="notice-board">
                <div>
                    {renderThis}
                </div>
            </div>
        );
    }
};

export default LinkSurvey;
