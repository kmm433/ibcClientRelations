import React from 'react';
import $ from 'jquery';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel, Button, Checkbox} from 'react-bootstrap';
import Validator from '../../../signup-app/components/SignupValidator.js';

//this class retrieves and sends data to display a contact us page if the user is signed in as a normal user
//if the user is signed in as an executive then they will see the same page but have the added option to edit their information
class UserAddress extends React.Component{
    constructor(){
        super()

        this.state = {
            edit: false,
            loaded: false,
            addressid: "",
            postalid: "",
            edit: false

        }
        this.getDetails = this.getDetails.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    componentWillMount(){
        this.getDetails()
    }

//get all the details of the chamber to display to the user
    getDetails(){
        $.ajax({url: '/php/get_address_ids.php', type: 'POST',
            dataType: 'json',
            data: {
                'userID': this.props.userID
            },
        success: response => {
            this.setState({
                addressid: response.addressID,
                postalid: response.postal
            })
            this.getAddress(response.addressID, response.postal)
        },
        error: response => {
            console.log("error")
        }
        });
    }
//retrieve the postal and location address of the chamber to display and to esit if the user is sigend in as an executive
    getAddress(addressid, postalid){
        $.ajax({url: '/php/get_address.php', type: 'POST',
            dataType: 'json',
            data: {
                'addressid': addressid,
                'postalid': postalid
            },
        success: response => {
            this.setState({
                address: response['address'][0],
                postal: response['postal'][0],
                loaded: true
            })

        },
        error: response => {
            console.log("error")
        }
        });
    }

    //if in edit mode set state variable to true so the component knows to render the edit functionality
        handleEdit(){
            this.setState({edit: true})
        }


//conditionally render the edit chamber functioanlity if the user is signed in as an executive and has clicked the button to enable edit mode
    render(){
        return(
            <div className='w3-row' id="edit-signup" style={{'marginLeft': '4%'}}>
                    <Button onClick={this.handleEdit}>Edit Address</Button>
                    {this.state.edit == true &&
                        <EditChamber
                            addressid={this.state.addressid}
                            postalid={this.state.postalid}
                            chamberData={this.state.info}
                            address={this.state.address}
                            postal={this.state.postal}
                            changePostal={this.changePostal}/>}
            </div>
        )
    }
}

class EditChamber extends React.Component{
    constructor(props){
        super(props)

        this.props

        this.state = {
            line1: this.props.address.line1,
            line2: this.props.address.line2,
            city: this.props.address.city,
            postcode: this.props.address.postcode,
            state: this.props.address.state,
            country: this.props.address.country,
            postalline1: this.props.postal.line1,
            postalline2: this.props.postal.line2,
            postalcity: this.props.postal.city,
            postalpostcode: this.props.postal.postcode,
            postalstate: this.props.postal.state,
            postalcountry: this.props.postal.country,
            postal: 0
        }

        this.saveAddress = this.saveAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.checkboxAddress = this.checkboxAddress.bind(this);

    }


    checkbox(){
        return(
            <FormGroup>
            <Col sm={3}>
               <ControlLabel>
                   Same as postal address? {'  '}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <Checkbox
                        onClick={e => this.checkboxAddress(e.target.checked)}
                    />
                </Col>
            </FormGroup>
        )
    }

    checkboxAddress(checked){
        var check = (this.state.postal + 1)%2;
        this.setState({
            postal: check
        })
    }

    handleSubmit(){
        $.ajax({url: '/php/update_address.php', type: 'POST',
            dataType: 'json',
            data: {
                'addressID': this.props.addressid,
                'postalID': this.props.postalid,
                'line1': this.state.line1,
                'line2': this.state.line2,
                'city': this.state.city,
                'postcode': this.state.postcode,
                'state': this.state.state,
                'country': this.state.country,
                'postal': 0,
                'postalline1': this.state.postalline1,
                'postalline2': this.state.postalline2,
                'postalcity': this.state.postalcity,
                'postalpostcode': this.state.postalpostcode,
                'postalstate': this.state.postalstate,
                'postalcountry': this.state.postalcountry

            },
        success: response => {
            console.log("success")
        },
        error: (xhr, status, err) => {
            console.log("error")
        }
        });
    }

//save the address to send back to the data handling component
    saveAddress(name, value){
        this.setState({[name]: value})
    }


    render(){

        return(
            <Form method='POST' onSubmit={this.handleSubmit}>
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Address</div>
                <EditAddress
                    type="Business Address"
                    save={this.saveAddress}
                    address={this.props.address}
                    index={0}/>
                {this.checkbox()}
                {this.state.postal == 1 &&
                    <div>
                    <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Postal Address</div>
                        <EditAddress
                            type="Postal Address"
                            save={this.saveAddress}
                            address={this.props.postal}
                            index={1}/>
                    </div>}
                <Button
                    className='btn btn-warning'
                    type="submit"> Save Changes
                </Button>
        </Form>
        );
    }

}

class EditAddress extends React.Component{
    constructor(props){
        super(props)

        this.storeAddress = this.storeAddress.bind(this);
    }

    storeAddress(value, index){

        var array = ['line1', 'line2', 'city','state', 'postcode', 'country'];

        name = array[index];

        if(this.props.type === "Postal Address")
            name = "postal" + name

        this.props.save(name, value);
    }

    checkboxAddress(checked){
        var check = (this.state.postal + 1)%2;
        this.props.changePostal(check)
    }

    render(){
        var address = [];
        address.push(this.props.address.line1)
        address.push(this.props.address.line2)
        address.push(this.props.address.city)
        address.push(this.props.address.state)
        address.push(this.props.address.postcode)
        address.push(this.props.address.country)

        var type = ['text', 'text', 'text','text', 'number', 'text'];
        var displayName = ['Line 1', 'Line 2', 'City', 'State', 'Postcode', 'Country'];
        var min = [1, 1, 1, 2, 4, 1];
        var max = [255, 255, 255, 30, 4, 255];
        var mand = ['1', '0', '1', '1', '1', '1'];

        return(
            <div>

                        {type.map((item, i) =>
                                <Validator
                                    key = {i}
                                    type = {name[i]}
                                    displayName = {displayName[i]}
                                    minimum = {min[i]}
                                    maximum = {max[i]}
                                    mandatory = {mand[i]}
                                    value={address[i] != null ? address[i] : ""}
                                    userAnswer = {this.storeAddress}
                                    index = {i}/>
                            )}
            </div>
        );
    }

}

export default UserAddress;
