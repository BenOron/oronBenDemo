import axios from "axios";

const PATH = 'https://taboola.herokuapp.com';


/**
 * Add new widget instance
 * @param payloadDate
 */
export const saveNewWidget = async (payloadDate) => {
        axios.post(`${PATH}/api/save`, payloadDate)
            .then((res) => {
                window.location.reload(false);
            }).catch((error) => {
            console.log(error)
        });
};

/**
 * Delete widget API
 * @param widgetId
 */
export const deleteWidget = (widgetId) => {
    try {
        axios.delete(`${PATH}/api/widgets/delete/${widgetId}`)
            .then((res) => {
                window.location.reload(false);
            }).catch((error) => {
            console.log(error)
        });
    } catch (err) {
        console.error(err);
    }
}

/**
 * Update widget property API
 * @param payloadDate
 * @param widgetId
 * @param clear for remove from home screen
 * @param replace for not reload page
 *
 */
export const updateWidget = async (payloadDate, widgetId,clear,replace) => {
    if(clear){
        payloadDate.locationWidget = -1;
    }
    try {
        await axios.patch(`${PATH}/api/widgets/update/${widgetId}`, payloadDate).then((res) => {
            if(!replace){window.location.reload(false)}
        }).catch((error) => {
            console.log(error)
        });
    } catch (err) {
        console.error(err);
    }
}


/**
 * Return all Widgets
 * @returns {Promise<unknown>}
 */
export const getAllWidgets = async () => {
    let allWidgets = '';
    try {
        allWidgets = await axios.get(`${PATH}/api//widgets`);
        return allWidgets.data;
    } catch (err) {
        console.error(err);
    }
}

/**
 * retrun if widget exist
 * @param payloadDate
 * @returns {Promise<boolean>}
 */
export const isWidgetExist = async (payloadDate) => {
    delete payloadDate.locationWidget;
    let existWidgets = '';
    try {
        existWidgets = await axios.patch(`${PATH}/api/widgets/widget/find`,payloadDate);
        return existWidgets.data.length > 0;
    } catch (err) {
       // console.error(err);
        return false;
    }
}