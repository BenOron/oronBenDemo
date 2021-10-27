import React, { useState } from "react";
import './menuEditWidgt.scss'
import { Navbar,Container} from 'react-bootstrap';
import TaboolaWidgetEditor from "../widgetEditor/TaboolaWidgetEditor";

const MenuEditWidget = (props) => {
    return (
        <><Navbar className='navbar'  expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <TaboolaWidgetEditor widget={props.widget} widgetNumber={props.widgetNumber} />
            </Container>
        </Navbar>
   </>
    )
}

export default MenuEditWidget;