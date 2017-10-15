import React from 'react';
import {Table} from 'react-bootstrap';
import $ from 'jquery';

class DisplayDetails extends React.Component{
    render(){
        console.log(this.props.info)
        console.log(this.props.info[0].name)
        console.log(this.props.info[0].line1)
        console.log(this.props.info[0].businessphone)
        return(
            <div>
            </div>

        )
    }
}

class ChamberDetails extends React.Component{
    constructor(){
        super()

        this.state = {
            info: {
                businessphone: "",
                city: "",
                country: "",
                line1: "",
                line2: "",
                name: "",
                postcode: "",
                state: ""
            },
            loaded: false
        }
        this.getDetails = this.getDetails.bind(this);

    }

    componentWillMount(){
        this.getDetails()
    }

    getDetails(){
        $.ajax({url: '/php/get_chamber_information.php', type: 'POST',
            dataType: 'json',

        success: response => {
            console.log(response)
            this.setState({
                info: response,
                loaded: true
            })
        },
        error: response => {
            console.log(response)
        }
        });
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
                        />
                    }

                </div>
            </div>
        )
    }
}

export default ChamberDetails;
