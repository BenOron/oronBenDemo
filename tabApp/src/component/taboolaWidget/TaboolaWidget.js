import React from "react";
import MenuEditWidget from "./MenuEditWidget";
import defaultBackground from '../../style/images/emptyState.png';
import {Trash} from 'react-bootstrap-icons';
import {updateWidget, deleteWidget, saveNewWidget} from "../../utils/util";

const TaboolaWidget = (props) => {
    const {imageWidget, widgetText, widgetNumber, widgetBrandName, widget, isEditable, fromContentBank} = props;

    /**
     * This method closing the content editor
     * Using document selector to toggle the view
     * reload page get new update  Todo change it redux?
     */
    const closeEditor = () => {
        document.getElementsByClassName("btn-close")[0].click();
    }

    /**
     * Set new widget to preview
     */
    const setWidget = () => {
        if (fromContentBank ) {
            widget.locationWidget = fromContentBank;
            updateWidget(widget, widget._id);
            closeEditor();
        }
    }

    /**
     * delete selected widget from the content bank.
     */
    const deleteWidgetFromContentBank = () => {
        deleteWidget(widget._id);
        closeEditor();
    }

    /**
     * return the widget UI
     */
    return (
        <div className={"widgetBox true "}>
            <div onClick={setWidget} className="img-bg true"
                 style={imageWidget && imageWidget.length > 0 ? {backgroundImage: `url(${imageWidget})`} : {backgroundImage: `url(${defaultBackground})`}}>
                {isEditable && <MenuEditWidget className="" widget={widget} widgetNumber={widgetNumber}/>}
            </div>
            <h4>{widgetText} {fromContentBank &&
            <Trash onClick={deleteWidgetFromContentBank} className="trash" color="royalblue" size={15}/>}</h4>
            {widgetBrandName && <div className="provider">Taboola</div>}
            {widgetBrandName && <div className="space">|</div>}
            {widgetBrandName && <div className="cat">{widgetBrandName}</div>}

        </div>

    )
};

export default TaboolaWidget;