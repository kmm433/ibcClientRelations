import React from 'react';
import $ from 'jquery';
import AdminForm from './AdminForm.js';
import {Form, Button, HelpBlock} from 'react-bootstrap';

class CreateChamber extends React.Component{

constructor(){
    super()

        this.state = {
            name: null,
            email: null,
            confirmemail: null,
            password: null,
            confirmpassword: null,
            firstname: null,
            lastname: null,
            abn: null,
            businessphone: null,
            mobilephone: null,
            anziccode: null,
            website: null,
            chamberemail: null,
            jobtitle: null,
            line1: null,
            line2: null,
            city: null,
            postcode: null,
            state: null,
            country: null,
            postalline1: null,
            postalline2: null,
            postalcity: null,
            postalpostcode: null,
            postalstate: null,
            postalcountry: null,
            parentID: null,
            hasParent: 0,
            parentButton: "Yes",
            chamberList: "",
            loaded: false,
            submitReady: false,
            postal: 1,
            error: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.save = this.save.bind(this);
        this.submitBtn = this.submitBtn.bind(this);
        this.disbledBtn = this.disabledBtn.bind(this);
        this.checkRequiredFields = this.checkRequiredFields.bind(this);
        this.changePostal = this.changePostal.bind(this);
        this.submitReady = this.submitReady.bind(this);
    }

    checkAddressReady(){
        console.log("checking both addresses", this.checkBAddress(), this.checkPAddress(), this.state.postal)
        if(this.state.postal===1 && this.checkBAddress() && this.checkPAddress()){
            console.log("yes 1")
            return true;
        }
        else if(this.state.postal===0 && this.checkBAddress()){
            console.log("Yes 2")
            return true;
        }
        else {
            return false;
        }
    }

    checkBAddress(){
        console.log(this.state.line1,this.state.city, this.state.postcode, this.state.state, this.state.country)
        if(this.state.line1 === null || this.state.city === null || this.state.postcode === null || this.state.state === null || this.state.country === null){
            return false;
        }
        return true;
    }

    checkPAddress(){
        if(this.state.postalline1 === null || this.state.postalcity === null || this.state.postalpostcode === null || this.state.postalstate === null || this.state.postalcountry === null){
            return false;
        }
        return true;
    }

    save(name, value) {
        console.log(name, value)
         this.setState({[name]: value});

         console.log(this.state.name, this.state.email, this.state.confirmemail, this.state.password, this.state.confirmpassword,
         this.state.firstname, this.state.lastname, this.state.abn, this.state.businessphone, this.state.mobilephone)

         if(this.state.email !== this.state.confirmemail){
             this.setState({error: "Emails do not match"})
         }
         else if(this.state.password !== this.state.confirmpassword){
             this.setState({error: "Passwords do not match"})
         }
         else{
             this.setState({error: ""})
             console.log("Ready Yet?", this.checkRequiredFields(), this.checkAddressReady())
         }
     }

     submitReady(){
         if(this.checkRequiredFields()&& this.checkAddressReady())
            return true;
        else {
            return false;
        }
     }

     changePostal(value){
         this.setState({postal: value})
     }

     componentWillMount(){
         this.getChamberList();
     }

     checkRequiredFields(){
         console.log(this.state.name, this.state.email, this.state.confirmemail, this.state.password, this.state.confirmpassword,
         this.state.firstname, this.state.lastname, this.state.abn, this.state.businessphone, this.state.mobilephone)

         if(this.state.name == null || this.state.email == null || this.state.confirmemail == null ||this.state.password == null || this.state.confirmpassword == null
         || this.state.firstname == null || this.state.lastname == null || this.state.abn == null ||this.state.businessphone == null || this.state.mobilephone == null){
             return false;
         }
         else {
             return true;
         }
     }


     getChamberList(){
         $.ajax({url: '/php/get_allchamber.php', type: 'POST',
             dataType: 'json',
             data: {
                 'mode': 0
             },
         success: response => {
             this.setState({
                 chamberList: response,
                 loaded: true
             });
         },
         error: response => {
             console.log(response)
         }
         });
     }

    handleSubmit(event){
        event.preventDefault();
        var address = {
            line1: this.state.line1,
            line2: this.state.line2,
            city: this.state.city,
            postcode: this.state.postcode,
            state: this.state.state,
            country: this.state.country
        }
        var postal = null
        if(this.state.postal == 1){
            postal = {
                postalline1: this.state.postalline1,
                postalline2: this.state.postalline2,
                postalcity: this.state.postalcity,
                postalpostcode: this.state.postalpostcode,
                postalstate: this.state.postalstate,
                postalcountry: this.state.postalcountry
            }
        }

        console.log(this.state.name, this.state.email, this.state.password, this.state.parentID, this.state.abn)
        $.ajax({url: '/php/insert_new_chamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': this.state.name,
                'email': this.state.email,
                'password': this.state.password,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'abn': this.state.abn,
                'parentID': this.state.parentID,
                'businessphone': this.state.businessphone,
                'mobilephone': this.state.mobilephone,
                'anziccode': this.state.anziccode,
                'website': this.state.website,
                'jobtitle': this.state.jobtitle,
                'chamberemail': this.state.chamberemail,
                'address': address,
                'postal': postal
            },
        success: response => {
            console.log("Did this work",response)
        },
        error: (xhr, status, err) => {
            console.log("error",xhr.responseText, status, err)
        }
    });
    }

    submitBtn(){
        return(
            <Button
                style={{'marginLeft': '42%'}}
                bsStyle="primary"
                type = "submit"
                onClick = {this.handleSubmit}
                >
                Submit
            </Button>
        )
    }

    disabledBtn(){
        return(
            <Button
                style={{'marginLeft': '42%'}}
                bsStyle="primary"
                disabled>
                Submit
            </Button>
        )
    }


    render(){
        return(
            <div className='w3-row' id="edit-signup">
                <Form
                    method='POST'
                    className="w3-container w3-card-4 w3-light-grey"
                    horizontal={true}
                    id = "AdminForm"
                    >
                        {this.state.loaded ?
                            <AdminForm
                                chamberlist = {this.state.chamberList}
                                save = {this.save}
                                changePostal = {this.changePostal}
                            />
                            : null}
                        <HelpBlock style={{'marginLeft': '45%', 'color': 'red'}}>{this.state.error}</HelpBlock>
                    {this.submitReady() ? this.submitBtn() : this.disbledBtn()}
                </Form>
            </div>
        );
    }

    }

export default CreateChamber;
