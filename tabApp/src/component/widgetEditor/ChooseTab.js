import React, { useState } from "react";
import './widgetEditor.scss'
import EditorEditContent from "./EditorEditContent";
import ContentBank from "../widgetsContentBank/ContentBank";
const ChooseTab = (props) => {
    const { currentWidget,widgetNumber} = props;

    const [checked,setChecked] = useState(currentWidget.imgSrcUri ? currentWidget.imgSrcUri.length <= 0:currentWidget?true:false);
    const changeChecked=()=>{
        setChecked(!checked)
    }
    return(
            <div className="tabs">
                <input className="radio" id="one" name="group" type="radio" onClick={changeChecked} checked={checked} readOnly/>
                    <input className="radio" id="two" name="group" type="radio"  onClick={changeChecked} checked={!checked} readOnly/>
                            <div className="tabs">
                                <label className="tab" id="one-tab" htmlFor="one">Choose Content</label>
                                <label className="tab" id="two-tab" htmlFor="two">Edit Or Add</label>
                            </div>
                            <div className="panels">
                                <div className="panel" id="one-panel">
                                    <ContentBank selectedWidget={currentWidget}  widgetNumber={widgetNumber}/>
                                </div>
                                <div className="panel" id="two-panel">
                                    <EditorEditContent currentWidget={currentWidget} widgetNumber={widgetNumber}/>
                                </div>
                            </div>
            </div>
    )
}

export default ChooseTab;