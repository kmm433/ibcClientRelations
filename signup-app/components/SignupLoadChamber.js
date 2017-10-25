import React from 'react';
import Logo from './LogoHeader.js'
import SignupData from './SignupDataHandler.js';
import $ from 'jquery';
import {ButtonToolbar, Button, ButtonGroup, DropdownButton, MenuItem, Col, } from 'react-bootstrap';
import Payment from './Payment/Paypal.js'

class ChamberDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evt){
      this.props.sendChamber(evt);
  }

  render() {
    return (
        <div>
            <ButtonGroup className="signup-dropdown">
                <DropdownButton
                    id="dropdown-btn-menu"
                    bsStyle="success"
                    title={this.props.selectedChamber ? this.props.selectedChamber : "Please Select a Chamber"}
                    onSelect={this.handleSelect}>
                    {Object.keys(this.props.chamber_list).map((item,index) =>
                        <MenuItem
                            key = {index}
                            eventKey={item}>{this.props.chamber_list[item]}
                        </MenuItem>)}
                </DropdownButton>
                </ButtonGroup>
        </div>
    );
  }
}

class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber_list: [],
          chamber: "Please Select a Chamber",
          selected: false,
          finish: false,
          userid: null,
          amount: null,
          requireApproval: null,
          clientID: null
        };

        this.getChamber = this.getChamber.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    /*ajax call to get list of chambers to display*/
    componentWillMount() {
      $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
      success: response => {
        this.setState({chamber_list: response})
      }});
    }

    getChamber(newChamber){
        this.setState({
            chamber: newChamber,
            selected: true
        })
    }

    handleFinish(requireApproval, amount, userid, clientID, expiry){
        console.log(requireApproval, amount, userid, clientID, expiry)
        this.setState({
            finish: true,
            selected: false,
            userid: userid,
            amount: amount,
            requireApproval: requireApproval,
            clientID: clientID,
            expiry: expiry
        })
    }

    checkRenderPayment(){
        if(this.state.requireApproval == 0){
            return (
                <div id="signup-container" className="w3-row">
                    <div style={{'padding': '4%'}} className="container4" className="w3-container w3-card-4 w3-light-grey">
                        <Col sm={1}/>
                        <Col sm={6}>
                            <div>
                                Please finish your membership signup by checking out with paypal
                            </div>
                            <div>
                                You can pay via Paypal or via Credit or Debit Card
                            </div>
                        </Col>
                            <Col sm={5}>
                                <Payment
                                    userid = {this.state.userid}
                                    amount = {this.state.amount}
                                    expiry = {this.state.expiry}
                                    token = {this.state.clientID}/>
                            </Col>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div id="signup-container" className="w3-row">
                    <Button>
                           <a href="/signin.php">Back to Login</a>
                   </Button>
                    <div className="container4" className="w3-container w3-card-4 w3-light-grey">
                        <p>Thank you for joining {this.state.chamber_list[this.state.chamber]}!</p>
                        <p>We will be in contact with you shortly</p>
                    </div>
                </div>
            );
        }
    }


  render() {
    return(
      <div className="establish-fonts">
          <div className="w3-panel w3-blue">
              <Logo/>
          </div>
          {this.state.finish == false &&
          <ButtonToolbar>
              <Button style={{'marginLeft': '3%'}}>
                     <a href="/signin.php">Back to Login</a>
             </Button>
              <ChamberDropdown
                  selectedChamber={this.state.chamber_list[this.state.chamber]}
                  chamber_list={this.state.chamber_list}
                  sendChamber={this.getChamber}/>
          </ButtonToolbar>}
          {this.state.selected && <SignupData
                                        chamberID={this.state.chamber}
                                        handleFinish={this.handleFinish}/>}
          {this.state.finish == true && this.checkRenderPayment()}
      </div>
    )
  }
}

export default Main;
