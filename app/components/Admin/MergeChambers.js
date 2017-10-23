import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom'
import {Form, Button, FormGroup, ControlLabel, Col, DropdownButton, ButtonGroup, MenuItem, Checkbox, HelpBlock} from 'react-bootstrap';

//Dropdown menu shows all the disabled chambers to merge into new chamber
class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        display: this.props.label,
        chamber: ""
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evt){
      this.setState({
          display: this.props.chamber_list[evt],
          chamber: evt
      })

      this.props.getSelectedChamber(this.props.type, evt);
  }

  render() {
    return (
        <div>
            <FormGroup>
                <Col sm={12}>
                    <ButtonGroup className="signup-dropdown">
                        <DropdownButton
                            id="dropdown-btn-menu"
                            bsStyle="success"
                            title={this.state.display}
                            onSelect={this.handleSelect}>
                            {Object.keys(this.props.chamber_list).map((item,index) =>
                                <MenuItem
                                    key = {index}
                                    eventKey={item}>{this.props.chamber_list[item]}
                                </MenuItem>)}
                        </DropdownButton>
                        </ButtonGroup>
                </Col>
            </FormGroup>
        </div>
    );
  }
}

//renders the enable chamber component
class MergeChamber extends React.Component{

    constructor(){
        super()

        this.state = {
            newChamber: "",
            oldChamber: "",
            loaded: false

        }

        console.log("mounting components")

        this.getChamberList = this.getChamberList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.save = this.save.bind(this);
        this.checkReadySubmit = this.checkReadySubmit.bind(this);
    }

    //before component mounts, get the chamber list
    componentWillMount(){
        this.getChamberList();
    }

    //ajax call to get the list of enabled chambers from the database
    getChamberList(){
        $.ajax({url: '/php/get_allchamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 0
            },
        success: response => {
            console.log(response)
            this.setState({
                chamberList: response,
                loaded: true
            });
        },
        error: (xhr, status, err) => {
            console.log(xhr.responseText, status, err)
            alert("An error occured, please refresh the page!")
        }
        });
    }

    checkReadySubmit(){
        if(this.state.oldChamber == null || this.state.newChamber == null){
            return false
        }
        else {
            return true;
        }
    }

     save(name, value){
         console.log("getting here")
         this.setState({[name]: value})
     }

//if it is ready to submit, then send the data to the database
     handleSubmit(event){
        event.preventDefault();
        if(this.checkReadySubmit() ==  true){
            if(confirm("Are you sure you want to merge " + this.state.chamberList[this.state.oldChamber] + " into " + this.state.chamberList[this.state.newChamber] + "?")){
                $.ajax({url: '/php/update_merge_chambers.php', type: 'POST',
                    dataType: 'json',
                    data: {
                        'oldChamber': this.state.oldChamber,
                        'newChamber': this.state.newChamber
                    },
                success: response => {
                    console.log("Success")
                    ReactDOM.findDOMNode(this.refs.form).submit();
                },
                error: (xhr, status, err) => {
                    console.log(xhr.responseText, status, err)
                    alert("An error occured, please refresh the page!")
                }
                });
            }
        }
        else{
            alert("You did not select both chambers!")
        }
     }

    render(){
        return(
            <div className='w3-row' id="edit-signup">
                <Form
                    method="POST"
                    className="w3-container w3-card-4 w3-light-grey"
                    ref = "form"
                    id = "AdminForm"
                    onSubmit={this.handleSubmit}>
                    <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'marginTop':'3%', 'paddingBottom': '0%'}}>
                        Merge Chambers
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        Select the chamber you want to merge from. <br/>
                        Now select the chamber you want to merge into.<br/>
                        When both chambers a selected, click merge.<br/>
                        Now all users data will be stored in the one chamber, you can edit the name and details once you log in with one of these accounts.
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                <div>
                        <Col sm={4}>
                            {this.state.loaded == true && <DropDown
                                getSelectedChamber = {this.save}
                                chamber_list={this.state.chamberList}
                                type = "oldChamber"
                                label="Select a Chamber to merge from"
                            />}
                        </Col>
                        <Col sm={4} style={{'paddingBottom': '5%'}}>
                            {this.state.loaded == true && <DropDown
                                getSelectedChamber = {this.save}
                                chamber_list={this.state.chamberList}
                                type = "newChamber"
                                label="Select a Chamber to merge into"
                            />}
                        </Col>
                        <Col sm={4}>
                            <Button style={{'marginTop': '7.5%'}} type="submit">
                                Confirm Merge
                            </Button>
                        </Col>
                    </div>
                </Form>
            </div>
        );
    }
}

export default MergeChamber;
