import React, { useState,useEffect } from "react";
import { Navbar,Offcanvas,Nav,NavDropdown,Button,FormControl,Form} from 'react-bootstrap';
import EditorEditContent from "./EditorEditContent";
import ChooseTab from "./ChooseTab";


const TaboolaWidgetEditor = (props) => {

    const [currentWidget,setCurrentWidget] = useState(props.widget);
    if(currentWidget.length < 0 ){
        currentWidget.widgetNumber = props.widgetNumber;
    }
    const getCurrentWidget= () =>{
        setCurrentWidget(props.widget);
    }

    return (
        <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            onEntered={getCurrentWidget}
            className='offcanvasNavbarWidgets'
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel" className='offcanvasNavbarTitle'>Widgets Editor</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <><ChooseTab currentWidget={currentWidget} widgetNumber={props.widgetNumber}/></>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
    )

}

export default TaboolaWidgetEditor;