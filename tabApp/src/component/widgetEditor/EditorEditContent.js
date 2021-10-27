import React  from "react";
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';


const EditorEditContent = (props) => {
    const {currentWidget, widgetNumber} = props;
    const payloadDate = {};

    const saveNewWidget = () => {
        collectData();
        if(validateInputs()){
            axios.post('http://localhost:8080/api/save', payloadDate)
                .then((res) => {
                    document.getElementsByClassName("btn-close")[0].click();
                    window.location.reload(false);
                }).catch((error) => {
                console.log(error)
            });
        }else{
            console.error('missing data')
        }
    };

    const deleteWidget = () => {
        axios.delete('http://localhost:8080/api/widgets/delete/' + currentWidget['_id'])
            .then((res) => {
                document.getElementsByClassName("btn-close")[0].click();
                window.location.reload(false);
            }).catch((error) => {
            console.log(error)
        });
    }


    const updateWidget = (clear) => {
        collectData();
        if(clear){
            payloadDate.locationWidget=-1;
        }
        if(validateInputs()) {
            axios.patch('http://localhost:8080/api/widgets/update/' + currentWidget['_id'])
                .then((res) => {
                    document.getElementsByClassName("btn-close")[0].click();
                }).catch((error) => {
                console.log(error)
            });
        }else{
            console.error('missing data')
        }
    }


    const clearWidget = () => {
        updateWidget(true)
    }


    const collectData = () => {
        payloadDate.country = document.getElementById('formCountry').value?.trim();
        payloadDate.title = document.getElementById('formTitle').value?.trim();
        payloadDate.brandName = document.getElementById('formBrandName').value?.trim();
        payloadDate.imgSrcUri = document.getElementById('formImageUri').value?.trim();
        payloadDate.locationWidget = currentWidget.locationWidget ? currentWidget.locationWidget : widgetNumber ? widgetNumber : -1;
    }

    const validateInputs = () => {
        return  payloadDate['country'].length > 0 &&
            payloadDate['brandName'].length > 0 &&
            payloadDate['title'].length  > 0 &&
            payloadDate['imgSrcUri'].length > 0;
    }

    return (
        <Form className='formEditContent'>
            <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label column="sm" lg={2}>
                    Country
                </Form.Label>
                <Form.Control type="text" defaultValue={currentWidget.country}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBrandName">
                <Form.Label column="sm" lg={2}>
                    BrandName
                </Form.Label>
                <Form.Control type="text" defaultValue={currentWidget.brandName}/>
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
            <div className='editorBtn'>
                 <Button variant="primary" type="button" onClick={saveNewWidget}>
                    Add New
                </Button>
                {currentWidget && <Button variant="primary" type="button" onClick={updateWidget}>
                    Update
                </Button>}
                {currentWidget && <Button variant="primary" type="button" onClick={clearWidget}>
                    Remove
                </Button>}
                {currentWidget['locationWidget'] && <Button variant="primary" type="button" onClick={deleteWidget}>
                    Delete
                </Button>}

            </div>
        </Form>
    )
}

export default EditorEditContent;