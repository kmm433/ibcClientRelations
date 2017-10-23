import React from 'react';
import {Button} from 'react-bootstrap';
import $ from 'jquery';
import EditChamber from './EditChamber'
import UserAddress from './UserAddressEdit'

class DisplayDetails extends React.Component{
    constructor(props){
        super(props)

        this.displayAddress = this.displayAddress.bind(this);
        this.displayPostalAddress = this.displayPostalAddress.bind(this);

    }

//display the address of the chamber
    displayAddress(){
        return(
            <div style={{'marginLeft': '5%', 'paddingBottom': '3%'}}>
                <div>{this.props.address.line1}</div>
                <div>{this.props.address.line2 != null && this.props.address.line2}</div>
                <div>{this.props.address.city}</div>
                <div>{this.props.address.state}{' '}{this.props.address.postcode}</div>
            </div>
        )
    }

    //display the postal address of the chamber
        displayPostalAddress(){
            return(
                <div style={{'marginLeft': '5%', 'paddingBottom': '3%'}}>
                    <div>{this.props.postal.line1}</div>
                    <div>{this.props.postal.line2 != null && this.props.postal.line2}</div>
                    <div>{this.props.postal.city}</div>
                    <div>{this.props.postal.state}{' '}{this.props.postal.postcode}</div>
                </div>
            )
        }

    render(){
        return(
            <div >
                <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'paddingTop': '2%'}}>{this.props.info[0].name}</div>
                <hr className = "signup-divider" />
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Details</div>
                <div style={{'marginLeft': '5%'}}>
                    {this.props.info[0].businessphone != null &&<div>Business Phone:{' '}{this.props.info[0].businessphone}</div>}
                    {this.props.info[0].website != null && <div>Website:{' '}{this.props.info[0].website}</div>}
                    {this.props.info[0].chamberemail != null &&  <div>Email:{' '}{this.props.info[0].chamberemail}</div>}
                </div>
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Address</div>
                {this.displayAddress()}
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Postal Address</div>
            {this.displayPostalAddress()}
            </div>

        )
    }
}

//this class retrieves and sends data to display a contact us page if the user is signed in as a normal user
//if the user is signed in as an executive then they will see the same page but have the added option to edit their information
class ChamberDetails extends React.Component{
    constructor(){
        super()

        this.state = {
            edit: false,
            loaded: false,
            addressid: "",
            postalid: ""

        }
        this.getDetails = this.getDetails.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getAddress = this.getAddress.bind(this);

    }

    componentWillMount(){
        this.getDetails()
    }

//get all the details of the chamber to display to the user
    getDetails(){
        $.ajax({url: '/php/get_chamber_information.php', type: 'POST',
            dataType: 'json',

        success: response => {
            this.setState({
                info: response
            })
            this.setState({
                addressid: response[0].location,
                postalid: response[0].postal
            })
            this.getAddress(response[0].location, response[0].postal)
        },
        error: response => {
            console.log("")
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
            console.log("")
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
            <div className='w3-row' id="edit-signup">
                <div
                    className="w3-container w3-card-4 w3-light-grey"
                    id = "AdminForm">
                    {this.state.loaded === true &&
                        <DisplayDetails
                            info={this.state.info}
                            address={this.state.address}
                            postal={this.state.postal}
                        />
                    }
                    {this.props.user_type == 1 && <Button onClick={this.handleEdit}>Edit Chamber Information</Button>}
                    {this.state.edit == true &&
                        <EditChamber
                            addressid={this.state.addressid}
                            postalid={this.state.postalid}
                            chamberData={this.state.info}
                            address={this.state.address}
                            postal={this.state.postal}
                            changePostal={this.changePostal}/>}

                </div>
            </div>
        )
    }
}

export default ChamberDetails;
