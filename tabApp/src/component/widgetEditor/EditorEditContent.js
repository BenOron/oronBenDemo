import React, { useState } from "react";
import { Form,Button} from 'react-bootstrap';
import axios from 'axios';


const EditorEditContent = (props) => {
    const { currentWidget,widgetNumber} = props;
    const payloadDate = {};

    const saveNewWidget = () => {
        collectData();
        axios.post('http://localhost:8080/api/save', payloadDate)
            .then((res) => {
                window.location.reload(false);
                console.log('Data has been sent to the server');
            }).catch((error) => {
            console.log(error)
        });

    };


    const updateWidget = () => {
        if(!currentWidget['_id']){
            return
        }
        collectData();
        axios.put('http://localhost:8080/api/widgets/?id='+currentWidget['_id'], payloadDate)
            .then((res) => {
                window.location.reload(false);
                console.log('Data has been sent to the server');
            }).catch((error) => {
            console.log(error)
        });

        // axios('http://localhost:8080/api/widgets/update/?id='+currentWidget['_id'], {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     data: JSON.stringify(payloadDate)
        // }).then(() => {
        //     console.log('Data has been sent to the server');
        // })
        //     .catch(() => {
        //         console.log('Internal server error');
        //     });
    };



    const collectData = () => {
        payloadDate.country = document.getElementById('formCountry').value;
        payloadDate.title = document.getElementById('formTitle').value;
        payloadDate.brandName = document.getElementById('formBrandName').value;
        payloadDate.imgSrcUri = document.getElementById('formImageUri').value;
        payloadDate.locationWidget = currentWidget.locationWidget ? currentWidget.locationWidget : widgetNumber ? widgetNumber :-1;
    }

    
    
    return(
        <Form className='formEditContent'>
            <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label column="sm" lg={2}>
                    Country
                </Form.Label>
                <Form.Control type="text" defaultValue={currentWidget.country}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBrandName">
                <Form.Label column="sm" lg={2}>
                    BrandName
                </Form.Label>
                <Form.Control type="text" defaultValue={currentWidget.brandName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label column="sm" lg={2}>
                    Title
                </Form.Label>
                <Form.Control as="textarea" rows={2} defaultValue={currentWidget.title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUri">
                <Form.Label column="sm" lg={2}>
                    ImageUri
                </Form.Label>
                <Form.Control as="textarea" rows={2} defaultValue={currentWidget.imgSrcUri}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={saveNewWidget  } >
                Submit
            </Button>
        </Form>
    )
}

export default EditorEditContent;