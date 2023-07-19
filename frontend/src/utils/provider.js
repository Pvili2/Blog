import axios from "axios";


export const provider = async (userContext) => {

    console.log(process.env.REACT_APP_API_URL + '/api/v1/users/provider')
    await axios.post(process.env.REACT_APP_API_URL + '/api/v1/users/provider', {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
    }).then(response => {
        userContext.userInfo.status && userContext.setUserInfo({ status: response.data.status, data: response.data.data })
    }).catch(err => userContext.setUserInfo({ status: "error" }))
}