import React from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';

class EditPayment extends React.Component {
    constructor(props){
        super(props);

        var array = []
        for(var i; i< this.props.paymentFields.length; i++){
            array.push(false);
        }

        this.state = ({
            edit: false
        })

        this.renderTable = this.renderTable.bind(this);

    }

    componentWillMount

    renderTable(){
        return (
                <Table striped bordered condensed hover>
                  <thead>
                      <tr>
                        <th> Membership Type </th>
                        <th> Additional Info </th>
                        <th> Payment Amount </th>
                        <th> Expiry Type </th>
                        {this.props.paymentFields[0].expirytype === "prorata" &&
                        <th> Expiry Date </th>}
                        <th> Edit </th>
                      </tr>
                  </thead>
                  <tbody>
                     {this.props.paymentFields.map((item, i) =>
                          <tr key = {this.props.paymentFields[i].name}>
                            <td>{this.props.paymentFields[i].name}</td>
                            <td>{this.props.paymentFields[i].info}</td>
                            <td>${this.props.paymentFields[i].amount}</td>
                            <td>{this.props.paymentFields[i].expirytype}</td>
                            {this.props.paymentFields[i].expirytype === "prorata" &&
                            <td>{this.props.paymentFields[i].expirydate}</td>}
                      </tr>)}
                  </tbody>
              </Table>
        );
    }

    render(){
        return(
            <div className="container">
                {this.renderTable()}
            </div>

        )
    }
}

export default EditPayment;
