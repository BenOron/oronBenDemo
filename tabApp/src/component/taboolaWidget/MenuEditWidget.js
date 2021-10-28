import React from "react";
import {Navbar, Container} from 'react-bootstrap';
import TaboolaWidgetEditor from "../widgetEditor/TaboolaWidgetEditor";

const MenuEditWidget = (props) => {

    /**
     * This menu with visibility is none used for offcanvasNavbar from react-bootstrap
     */
    return (
        <><Navbar className='navbar' expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" className='toggleBtn'/>
                <TaboolaWidgetEditor widget={props.widget} widgetNumber={props.widgetNumber}/>
            </Container>
        </Navbar>
        </>
    )
}

export default MenuEditWidget;