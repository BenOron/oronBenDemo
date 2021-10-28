import React from "react";

import {Form, Button} from 'react-bootstrap';
import {saveNewWidget,deleteWidget,updateWidget} from '../../utils/util'

const EditorEditContent = (props) => {
    const {currentWidget, widgetNumber} = props;
    let clearFromPreview = false;
    const payloadDate = {};
    const widgetId = currentWidget['_id'];


    /**
     * This method closing the content editor
     * Using document selector to toggle the view
     * reload page get new update  Todo: change it redux?
     */
    const closeEditor = () => {
        document.getElementsByClassName("btn-close")[0].click();
       window.location.reload(false);
    }


    /**
     * Clear widget from the preview page
     */
    const clearFromPreviewPage = () => {
        clearFromPreview = true;
        updateSelectedWidget();
    }

    /**
     * Add New widget to the content bank.
     */
    const saveWidget = () => {
        collectData();
        if(validateInputs()){
            saveNewWidget(payloadDate)
            closeEditor();
        }else{
            console.error('missing data')
        }
    };

    /**
     * delete selected widget from the content bank.
     */
    const deleteSelectedWidget = async () => {
       deleteWidget(widgetId);
       closeEditor();
    }


    /**
     * Update the exist widget or clear from the preview page
     */
    const updateSelectedWidget = () => {
        collectData();
        if(validateInputs()) {
            updateWidget(payloadDate,widgetId,clearFromPreview)
            closeEditor();
        }
    }


    /**
     * Preparing the Form data and remove
     */
    const collectData = () => {
        payloadDate.country = document.getElementById('formCountry').value?.trim();
        payloadDate.title = document.getElementById('formTitle').value?.trim();
        payloadDate.brandName = document.getElementById('formBrandName').value?.trim();
        payloadDate.imgSrcUri = document.getElementById('formImageUri').value?.trim();
        payloadDate.locationWidget = currentWidget.locationWidget ? currentWidget.locationWidget : widgetNumber ? widgetNumber : -1;
    }

    /**
     * Verify all the form field not empty.
     * Todo - we can add here more verification options
     * @returns {boolean}
     */
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
                {!currentWidget && <Button  type="button" onClick={saveWidget}>
                    Add New
                </Button>}
                {currentWidget && <Button  type="button" onClick={updateSelectedWidget}>
                    Update
                </Button>}
                {currentWidget && <Button  type="button" onClick={clearFromPreviewPage}>
                    Remove
                </Button>}
                {currentWidget['locationWidget'] && <Button className='delete' type="button" onClick={deleteSelectedWidget}>
                    Delete
                </Button>}

            </div>
        </Form>
    )
}

export default EditorEditContent;