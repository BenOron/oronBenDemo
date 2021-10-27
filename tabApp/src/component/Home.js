import React, {useEffect, useState} from "react";
import {Container, Row, Col, ButtonGroup, ToggleButton} from 'react-bootstrap';
import TaboolaWidget from "./taboolaWidget/TaboolaWidget";
import './home.scss';
import axios from "axios";

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
                oWidgets[locationWidget] = (<Col key={locationWidget} index={locationWidget}>
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

            <div className='main'>
                <ButtonGroup className="mb-2" className='editModeBtnGr'>
                    <ToggleButton
                        id="toggle-check"
                        type="checkbox"
                        variant="secondary"
                        checked={editMode}
                        value="1"
                        className='editModeBtn'
                        onChange={toggleEditMode}
                    >
                        {editMode ? 'Go to preview mode' : 'Go to edit mode'}
                    </ToggleButton>
                </ButtonGroup>
                {widgets && <Container className='homeContainer'>
                    <Row lg={3} className='widgetRow'>
                        <GetWidgets></GetWidgets>
                    </Row>
                </Container>}
            </div>
        </>)

}

export default Home;
