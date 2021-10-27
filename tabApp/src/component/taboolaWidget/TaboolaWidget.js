import React, { useState } from "react";
import MenuEditWidget from "./MenuEditWidget";
import defaultBackground from '../../style/images/emptyState.png';
import axios from "axios";

const TaboolaWidget = (props) => {
    const { imageWidget,widgetText,widgetNumber,widgetBrandName,widget,isEditable,fromContentBank} = props;

    const setWidget = ()=>{
        if(fromContentBank){
            delete widget._id;
            widget.locationWidget = fromContentBank;
            saveNewWidget(widget);
        }
    }

    const saveNewWidget = (widget) => {
        //collectData();
        axios.post('http://localhost:8080/api/save', widget)
            .then((res) => {
                window.location.reload(false);
                console.log('Data has been sent to the server');
            }).catch((error) => {
            console.log(error)
        });

    };
      return (
          <div className={"demo-card true "} onClick={setWidget} tabIndex="-1">
              <div className="img-bg true"
                   style={imageWidget && imageWidget.length > 0 ? {backgroundImage: `url(${imageWidget})`}:{backgroundImage: `url(${defaultBackground})`}}  >
                 {isEditable && <MenuEditWidget className="" widget={widget} widgetNumber={widgetNumber}/>}
              </div>
              <h4>{widgetText}</h4>
              {widgetBrandName && <div className="name">Taboola</div> }
              {widgetBrandName &&<div className="space">|</div>}
              {widgetBrandName &&  <div className="cat">{widgetBrandName}</div>}

          </div>

      )
};




export default TaboolaWidget;