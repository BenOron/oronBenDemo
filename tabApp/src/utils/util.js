import axios from "axios";

export const saveNewWidget = (payloadDate) => {
        axios.post('http://localhost:8080/api/save', payloadDate)
            .then((res) => {
                document.getElementsByClassName("btn-close")[0].click();
                window.location.reload(false);
            }).catch((error) => {
            console.log(error)
        });
};
//
// export  const deleteWidget = () => {
//     axios.delete('http://localhost:8080/api/widgets/delete/' + currentWidget['_id'])
//         .then((res) => {
//             document.getElementsByClassName("btn-close")[0].click();
//             window.location.reload(false);
//         }).catch((error) => {
//         console.log(error)
//     });
// }
//
//
// const updateWidget = (clear) => {
//     collectData();
//     if(clear){
//         payloadDate.locationWidget=-1;
//     }
//     if(validateInputs()) {
//         axios.patch('http://localhost:8080/api/widgets/update/' + currentWidget['_id'])
//             .then((res) => {
//                 document.getElementsByClassName("btn-close")[0].click();
//             }).catch((error) => {
//             console.log(error)
//         });
//     }else{
//         console.error('missing data')
//     }
// }
//
