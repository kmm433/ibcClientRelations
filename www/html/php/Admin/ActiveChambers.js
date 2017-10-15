import React from 'react';
import {Table} from 'react-bootstrap';

class ActiveChamberTable extends React.Component{
    render(){
        console.log("",this.props.activeChambers)
        return(
            <Table striped bordered condensed hover>
              <thead>
                  <tr>
                    <th> Chamber Name </th>
                    <th> Parent Name </th>
                  </tr>
              </thead>
              <tbody>
                 {this.props.activeChambers.map((item, i) =>
                      <tr key = {i}>
                          <td>{this.props.activeChambers[i].name}</td>
                      <td>
                          {this.props.chamber_list[this.props.activeChambers[i].parent_id]}
                      </td>
                  </tr>)}
              </tbody>
          </Table>
        )
    }
}

export default ActiveChamberTable;
