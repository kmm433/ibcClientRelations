import React from 'react';
import {Table, Button} from 'react-bootstrap';
import $ from 'jquery';
import EditChamber from './EditChamber'

class DisplayDetails extends React.Component{
    constructor(){
        super()

        this.displayAddress = this.displayAddress.bind(this);
    }


    displayAddress(){
        return(
            <div style={{'marginLeft': '5%', 'paddingBottom': '3%'}}>
                <div>{this.props.address[0].line1}</div>
                <div>{this.props.address[0].line2 != null && this.props.address[0].line2}</div>
                <div>{this.props.address[0].city}</div>
                <div>{this.props.address[0].state}{' '}{this.props.address[0].postcode}</div>
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

            </div>

        )
    }
}

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

    getDetails(){
        var values=[];
        $.ajax({url: '/php/get_chamber_information.php', type: 'POST',
            dataType: 'json',

        success: response => {
            console.log(response)

            values.push(response[0].name)
            values.push(response[0].businessphone)
            values.push(response[0].mobilephone)
            values.push(response[0].anziccode)
            values.push(response[0].website)
            values.push(response[0].chamberemail)
            values.push(response[0].abn)


            this.setState({
                info: response,
                values: values
            })
            console.log("ARRAY", values)
            this.setState({
                addressid: response[0].location,
                postalid: response[0].postal
            })
            this.getAddress(response[0].location, response[0].postal)
        },
        error: response => {
            console.log(response)
        }
        });
    }

    getAddress(addressid, postalid){
        $.ajax({url: '/php/get_address.php', type: 'POST',
            dataType: 'json',
            data: {
                'addressid': addressid,
                'postalid': postalid
            },
        success: response => {
            console.log("address",response)
            this.setState({
                address: response,
                loaded: true
            })
        },
        error: response => {
            console.log(response)
        }
        });
    }

    handleEdit(){
        this.setState({edit: true})
    }


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
                        />
                    }
                    {this.props.user_type == 1 && <Button onClick={this.handleEdit}>Edit Chamber Information</Button>}
                    {this.state.edit == true &&
                        <EditChamber
                            addressid={this.state.addressid}
                            postalid={this.state.postalid}
                            chamberData={this.state.info}
                            address={this.state.address}
                            changePostal={this.changePostal}/>}

                </div>
            </div>
        )
    }
}

export default ChamberDetails;
