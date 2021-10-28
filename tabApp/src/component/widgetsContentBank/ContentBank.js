import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TaboolaWidget from "../taboolaWidget/TaboolaWidget";
import FilterContent from "../widgetEditor/FilterContent";

const ContentBank = (props) => {
    const allWidgets = localStorage.widgets ? JSON.parse(localStorage.widgets) : false; //Todo change localStorage to redux
    const [filterWidgets, setFilterWidgets] = useState('');


    /**
     * We can send eny filter key
     * @param filterKey
     */
    const filterSelectFn = (filterKey) => {
        setFilterWidgets(filterKey)
    }

    /**
     * This code run all widgets in our localStorage and return component
     * Todo change local storage to redux
     * @returns {*[]}
     * @constructor
     */
    const GetWidgets = () => {
        let oWidgets = [];
        const WGridSize = 6;
        for (let i = 0; i < allWidgets.length; i++) {
            const widget = allWidgets[i];
            //Filtering by key
            if (filterWidgets !== '' && (widget.brandName === filterWidgets || widget.country === filterWidgets)) {
                oWidgets[i] = (<Col xs={WGridSize} xl={WGridSize} xxl={WGridSize} sm={WGridSize} lg={WGridSize} md={WGridSize} key={i} index={i}>
                    <TaboolaWidget fromContentBank={props.widgetNumber} widget={widget} widgetText={widget.title}
                                   widgetBrandName={widget.brandName} imageWidget={widget.imgSrcUri}
                                   widgetNumber={props.selectedWidget} editMode={widget.isEmpty}/>
                </Col>);
                //Clear the filter show all content
            } else if (filterWidgets === '') {
                oWidgets[i] = (<Col xs={WGridSize} xl={WGridSize} xxl={WGridSize} sm={WGridSize} lg={WGridSize} md={WGridSize} key={i} index={i}>
                    <TaboolaWidget fromContentBank={props.widgetNumber} widget={widget} widgetText={widget.title}
                                   widgetBrandName={widget.brandName} imageWidget={widget.imgSrcUri}
                                   widgetNumber={props.selectedWidget} editMode={widget.isEmpty}/>
                </Col>);
            }

        }
        return oWidgets;
    };


    return (
        <>
            <div className='filterContentClass'><FilterContent allWidgets={allWidgets} filterSelectFn={filterSelectFn}/>
            </div>
            {allWidgets && <Row lg={2} className='contentBank'>
                <GetWidgets/>
            </Row>
            }
        </>
    )

}

export default ContentBank;
