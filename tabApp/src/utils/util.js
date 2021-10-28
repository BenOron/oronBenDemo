import axios from "axios";
const PATH = 'http://localhost:8080';



/**
 * Add new widget instance
 * @param payloadDate
 */
export const saveNewWidget = (payloadDate) => {
        axios.post(`${PATH}/api/save`, payloadDate)
            .then((res) => {
            }).catch((error) => {
            console.log(error)
        });
};

/**
 * Delete widget API
 * @param widgetId
 */
export  const deleteWidget = (widgetId) => {
    axios.delete(`${PATH}/api/widgets/delete/${widgetId}`)
        .then((res) => {
            window.location.reload(false);
        }).catch((error) => {
        console.log(error)
    });
}

/**
 * Update widget property API
 * @param payloadDate
 * @param widgetId
 */
export const updateWidget = (payloadDate,widgetId) => {
        axios.patch(`${PATH}/api/widgets/update/${widgetId}`,payloadDate)
            .then((res) => {
                document.getElementsByClassName("btn-close")[0].click();
            }).catch((error) => {
            console.log(error)
        });
}


/**
 * Return all Widgets
 * @returns {Promise<unknown>}
 */
export const getAllWidgets = async () =>{
    let allWidgets ='';
    try {
        allWidgets = await axios.get('http://localhost:8080/api/widgets');
        return allWidgets.data;
    } catch (err) {
        console.error(err);
    }
}
