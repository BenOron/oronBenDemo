import axios from "axios";

const PATH = 'https://taboola.herokuapp.com';


/**
 * Add new widget instance
 * @param payloadDate
 */
export const saveNewWidget = (payloadDate) => {
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
 */
export const updateWidget = async (payloadDate, widgetId,clear) => {
    if(clear){
        payloadDate.locationWidget = -1;
    }
    try {
        await axios.patch(`${PATH}/api/widgets/update/${widgetId}`, payloadDate) .then((res) => {
            window.location.reload(false);
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
