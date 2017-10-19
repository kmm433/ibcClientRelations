import React from 'react';
import {Button, Col, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';


class ApproveUser extends React.Component {
    constructor(props){
        super(props)

        this.renderAutomatic = this.renderAutomatic.bind(this);
        this.renderManual = this.renderManual.bind(this);
        this.handleChangetoAutomatic = this.handleChangetoAutomatic.bind(this);
        this.handleChangetoManual = this.handleChangetoManual.bind(this);
    }
//update approval status in parent component for conditional rendering
    handleChangetoManual(){
        this.props.updateApproval(1);
    }
//update approval status in parent component for conditional rendering
    handleChangetoAutomatic(){
        this.props.updateApproval(0);
    }
//if the payment settings are set to automamatic then render information about the user flow and give them the option to switch to manual
    renderAutomatic(){
        return(
            <div>
                <div>
                    <Col sm={12}>
                        <div>
                                Your approval settings are currently set to Automatic.
                        </div>
                        <div>
                                Users will currently be automatically directed to payment page and become a member of your chamber upon payment.
                        </div>
                    </Col>
                    <Col style={{'paddingTop': '2%'}} sm={8}>
                        <div>
                                If you would like to manually approve users and send them an invoice, switch to Manual.
                        </div>
                    </Col>

                        <Col sm={4}>
                            <Button
                                onClick={this.handleChangetoManual}>
                                Switch to Manual
                            </Button>
                        </Col>
                </div>
            </div>
        )
    }

    //if the payment settings are set to manual then render information about the user flow and give them the option to switch to automatic
    renderManual(){
        return(
            <div>
                <div style={{'padding': '2%'}}>
                    <Col sm={12}>
                        <div>
                                Your approval settings are currently set to Manual.
                        </div>
                        <div>
                                Users wishing to join your chamber will now show up in the Approve User section of the menu.
                        </div>
                        <div>
                                Once you approve a user, they will show up as expired in your member list. Send them an invoice to finalise membership.
                        </div>
                    </Col>
                    <Col style={{'paddingTop': '2%'}} sm={8}>
                        <div>
                            If you would like to automatically approve users, switch to Automatic.
                        </div>
                    </Col>
                        <Col style={{'paddingTop': '1%'}} sm={4}>
                            <Button
                                onClick={this.handleChangetoAutomatic}>
                                Automatic
                            </Button>
                        </Col>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div style={{'marginBottom': '25%'}}>
                {this.props.approval == 0 ? this.renderAutomatic() : this.renderManual()}
            </div>
        )
    }
}

export default ApproveUser;
