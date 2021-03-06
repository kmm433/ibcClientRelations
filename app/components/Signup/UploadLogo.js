/*Not a Requirement and not used in final prject but left here in case want to add in future or have time to
fix up*/

import React from 'react';
import $ from 'jquery';
import serialize from 'form-serialize';
import {Col, ButtonToolbar} from 'react-bootstrap';

class UploadLogo extends React.Component{
    constructor(){
        super()

        this.submitImage = this.submitImage.bind(this);
    }

    submitImage(event){
        event.preventDefault();
        var image = document.querySelector('input[type="file"]').files[0];

    $.ajax({
        url:'/php/insert_logo.php',
        type:'POST',
        processData: false,
        contentType: false,
        data: image,
        success: response => {
            alert(response);
        },
        error: (xhr, status, err) => {
          console.log(xhr.responseText, status, err)
        }
    });

}

    render(){

        return(
            <form action='/php/insert_logo.php' method="POST" id="myForm" encType="multipart/form-data">
                <div id="edit-signup-panel" className="w3-panel w3-blue">
                    <ButtonToolbar style={{'padding': '2%'}}>
                        <Col sm={3}>
                            <input type="file" name="image"/>
                        </Col>
                        <Col sm={3}>
                            <input type="submit" name="submit" value="Upload"/>
                        </Col>
                    </ButtonToolbar>
                </div>
            </form>
        )
    }
}

export default UploadLogo;
