import React, {useEffect, useState} from "react";
import {Container, Row, Col, ButtonGroup, ToggleButton, Navbar} from 'react-bootstrap';
import TaboolaWidget from "./taboolaWidget/TaboolaWidget";
import './home.scss';
import axios from "axios";
import taboolaLogo from '../style/images/logo.png'
import { PencilSquare ,Eye} from 'react-bootstrap-icons';

const Home = () => {

    const [editMode, setEditMode] = useState(false);
    const [widgets, setWidgets] = useState();

    const getWidgets = () => {
        axios.get('http://localhost:8080/api/widgets')
            .then(res => {
                if (res && res.data.length > 0) {
                    setWidgets(res.data);
                    localStorage.setItem('widgets', JSON.stringify(res.data))
                } else {
                    setWidgets([]);
                    localStorage.setItem('widgets', 'false')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const openEditor =(event) => {
     if(editMode &&!document.body.classList.contains('modal-open')){
         const index = event.currentTarget.getAttribute('index')
         document.getElementsByClassName('toggleBtn')[index-1].click();
     }
    }

    useEffect(() => {
        localStorage.removeItem('widgets');
        getWidgets();

    }, []);

    const GetWidgets = () => {
        let oWidgets = [];
        let tempLocationWidget = {1:0,2:0,3:0,4:0,5:0,6:0}
        for (let i = 0; i < widgets.length; i++) {
            const widget = widgets[i];
            const locationWidget = widget.locationWidget && widget.locationWidget > -1 ? widget.locationWidget : false;
            if (locationWidget) {
                oWidgets[locationWidget] = (<Col onClick={openEditor} xs={4} xl={4}  xxl={4} sm={4} lg={4} md={4} key={locationWidget} tabIndex='0' index={locationWidget}>
                    <TaboolaWidget isEditable={editMode} widget={widget} widgetText={widget.title}
                                   widgetBrandName={widget.brandName} imageWidget={widget.imgSrcUri}
                                   widgetNumber={locationWidget} editMode={widget.isEmpty}/>
                </Col>)
                tempLocationWidget[locationWidget] = 1;
            }
        }
        for (const [key, value] of Object.entries(tempLocationWidget)) {
            if(value < 1){
                oWidgets[key] = (<Col key={key } index={key }>
                    <TaboolaWidget isEditable={editMode} widget={''} widgetText={''} widgetBrandName={''}
                                   widgetNumber={key } imageWidget={''}
                                   editMode={editMode}/>
                </Col>);
                tempLocationWidget[key] =  1;
            }
        }

        return oWidgets;
    };


    return (
        <>

            <div className={!editMode ? ' main ' :'main edit'}>
                <div className='bar'>
                    <img src={taboolaLogo} className='logo' alt='Taboola'/>
                </div>
                {widgets && <Container className='homeContainer'>
                    <Row lg={3} className='widgetRow'>
                        <GetWidgets/>
                    </Row>
                </Container>}
                {!editMode && <div className='floatingBtn' title='Edit Mode' onClick={toggleEditMode}  ><PencilSquare  color="white" size={24} /></div> }
                {editMode && <div className='floatingBtn' onClick={toggleEditMode}  ><Eye  color="white" size={24} /></div> }

            </div>
        </>)

}

export default Home;
