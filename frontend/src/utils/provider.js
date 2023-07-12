import axios from "axios";


export const provider = async (userContext) => {

    await axios.post('http://localhost:4000/api/v1/users/provider', {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
    }).then(response => {
        userContext.userInfo.status && userContext.setUserInfo({ status: response.data.status, data: response.data.data })
    }).catch(err => userContext.setUserInfo({ status: "error" }))
}