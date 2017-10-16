import React from 'react';
import $ from 'jquery';                                     /* For ajax query */

class EditNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            id: ""
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.setState({
          title: this.props.title,
          message: this.props.message,
          id: this.props.id
        });
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    submit(){
        $.ajax({
            url: '/php/modify_Notification.php',
            type:'POST',
            dataType: "json",
            data:{
                'notifID': this.state.id,
                'title' : this.state.title,
                'message': this.state.message
            },
            success : function(response){
                //console.log('modify_Notification Success');
                this.props.reload();
            }.bind(this),
            error: function(xhr, status, err){
                console.log('modify_Notification Error' + xhr.responseText);
            }.bind(this)
        });
    }

    render(){
        return(
            <div>
                <h4>Click on the field to modify</h4>
                <div className="notice">
                    <div className="notice-title">
                        <div className="w3-col s11"><h2><input type="text" className="editNoticeTitle" name="title" value={this.state.title} onChange={this.handleChange}/></h2></div>
                    </div>
                    <div className="notice-content" style={{whiteSpace: 'pre-line', wordBreak: 'break-all'}}>
                        <textarea rows="5" name="message" className="editNoticeMessage" value={this.state.message} onChange={this.handleChange}></textarea>
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    {<button type="button" className="btn btn-primary" id="btnSubmitSurvey" onClick={this.submit}>Submit</button>}
                </div>
            </div>
        );
    }
};

export default EditNotice;
