import React from 'react';
import {Table, Button, ButtonGroup, Col, ControlLabel} from 'react-bootstrap';         /*https://react-bootstrap.github.io/*/
import DatePicker from 'react-datepicker';                          /* https://github.com/Hacker0x01/react-datepicker */
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class PaymentType extends React.Component {
    constructor(props){
        super(props)

        console.log("Expiry", this.props.expiry)
        this.state = {
            expiry: moment(),
            addProRata: false,
            editProRata: false,
            type: this.props.paymentType
        }
        this.changeToProrata = this.changeToProrata.bind(this);
        this.renderAnnual = this.renderAnnual.bind(this);
        this.renderProrata = this.renderProrata.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
        this.changeProRataBtn = this.changeProRataBtn.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChangeToAnnual = this.handleChangeToAnnual.bind(this);
    }

    //if the expiry type recieved is not null, then set the state
    componentWillMount(){
        this.props.expiry !== null && this.setState({expiry: moment(this.props.expiry)})
    }

    componentWillReceiveProps(nextProps){
        console.log("Mounting again", this.props.paymentType, this.props.expiry)
        nextProps.expiry !== null && this.setState({expiry: moment(nextProps.expiry)})
    }

    //when changes are confirmed send the new payment type and expiry date (null if annual)
    handlePaymentChange(){
        this.props.updatePaymentType(this.state.type, this.state.expiry);
        this.setState({addProRata: false, editProRata: false})
    }

    //When switch to prorata button is clicked change
    handleChange(date){
        console.log("Checking date:", date)
        this.setState({
            expiry: moment(date),
            type: "ProRata"
        });
    }
//if the recieved payment type is annual then just render the button with the option to sqitch to proRata
    renderAnnual(){
        return(
            <div>
                <ControlLabel>
                    Your payment type is currently set to: {' '} {this.props.paymentType}
                </ControlLabel>
                <Button onClick = {this.changeProRataBtn}>
                    {this.state.addProRata == false ? "Switch to ProRata" : "Cancel"}
                </Button>
            </div>
        )
    }
//when the button is pressed show or hide the pro rata options
    changeProRataBtn(){
        console.log("changing")
        if(this.state.addProRata === true){
            this.setState({addProRata: false})
        }
        else if (this.state.addProRata === false){
            this.setState({addProRata: true})
        }
    }
    //if the user presses the change to annual button then update state
    handleChangeToAnnual(){
        this.setState({addProRata: false})
        this.props.updatePaymentType('Annual', null);
    }

    //turn edit mode on
    handleDateChange(){
        console.log("changing")
        this.setState({editProRata: true})
    }

    renderEditDate(){
        return(
            <div>
                <Col sm={4}>
                    <ControlLabel style={{'marginTop': '2%'}}>
                        Please choose a date of expiry:
                    </ControlLabel>
                </Col>
                    <Col sm={4}>
                        <DatePicker
                            style={{'marginTop': '1%'}}
                            dateFormat="DD-MM-YYYY"
                            selected={this.state.expiry}
                            onChange={this.handleChange}
                            minDate={moment()}
                            maxDate={moment().add(1, "year")}
                        />
                    </Col>
                    <Col sm={4}>
                        <Button onClick = {this.handlePaymentChange}>
                           Confirm Changes
                       </Button>
                    </Col>
            </div>

        )
    }

    changeToProrata(){
        return (
            <div>
                <Col sm={4}>
                    <ControlLabel style={{'marginTop': '2%'}}>
                        Please choose a date of expiry:
                    </ControlLabel>
                </Col>
                    <Col sm={4}>
                        <DatePicker
                            style={{'marginTop': '2%'}}
                            dateFormat="DD-MM-YYYY"
                            selected={this.state.expiry}
                            onChange={this.handleChange}
                            minDate={moment()}
                            maxDate={moment().add(1, "year")}
                        />
                    </Col>
                    <Col sm={4}>
                        <Button onClick = {this.handlePaymentChange}>
                           Confirm Changes
                       </Button>
                    </Col>
            </div>
        )
    }


    //if the chamber's payment settings are currently set to Pro Rata then display their current expiry date
    //and five them the option to edit it or switch to Annual
    renderProrata(){
        return(
            <div>
                <div>
                    Your payment type is currently set to: {' '} {this.props.paymentType}
                </div>
                <div>
                    The date that memberships will expire is {this.state.expiry != null && this.state.expiry.format("LL")}
                </div>
             <ButtonGroup>
                 <Button onClick = {this.handleDateChange}>
                    Edit Expiry Date
                </Button>
                <Button onClick = {this.handleChangeToAnnual}>
                   Switch to Annual
               </Button>
             </ButtonGroup>
         </div>
        )
    }

    render(){
        return(
            <div>
                {this.props.paymentType === "Annual" ? this.renderAnnual() : this.renderProrata()}
                {this.state.addProRata === true && this.changeToProrata()}
                {this.state.editProRata === true && this.renderEditDate()}
            </div>
        )
    }
}

export default PaymentType;
