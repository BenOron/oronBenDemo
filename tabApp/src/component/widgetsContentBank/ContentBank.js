import React, { useState } from "react";
import {Col, Row} from "react-bootstrap";
import TaboolaWidget from "../taboolaWidget/TaboolaWidget";
import FilterContent from "../widgetEditor/FilterContent";

const ContentBank = (props) => {
    const allWidgets=localStorage.widgets ? JSON.parse(localStorage.widgets):false;
    const [filterWidgets,setFilterWidgets] = useState('');

    const filterSelectFn = (filterKey) => {
        setFilterWidgets(filterKey)
    }

    const GetWidgets =() =>{
        let oWidgets = [];
        for(let i = 0 ; i<allWidgets.length;i++){
            const widget = allWidgets[i];
            if(filterWidgets !== '' &&( widget.brandName === filterWidgets || widget.country === filterWidgets)){
                oWidgets[i] = (<Col key={i} index={i} >
                    <TaboolaWidget fromContentBank={props.widgetNumber} widget={widget} widgetText={widget.title} widgetBrandName={widget.brandName} imageWidget={widget.imgSrcUri}
                                    widgetNumber={props.selectedWidget} editMode={widget.isEmpty} />
                </Col>);
            }else if(filterWidgets === ''){
                oWidgets[i] = (<Col key={i} index={i} >
                    <TaboolaWidget  fromContentBank={props.widgetNumber} widget={widget} widgetText={widget.title} widgetBrandName={widget.brandName} imageWidget={widget.imgSrcUri}
                                    widgetNumber={props.selectedWidget} editMode={widget.isEmpty} />
                </Col>);
            }

        }
        return oWidgets;
    };

      return (
        <>
        {/*Need to add scroll pagination*/}
         <div className='filterContentClass'><FilterContent allWidgets={allWidgets}  filterSelectFn={filterSelectFn}/></div>
            {allWidgets &&  <Row lg={2} className='contentBank'>
                <GetWidgets />
            </Row>
        }
        </>
    )

}

export default ContentBank;
