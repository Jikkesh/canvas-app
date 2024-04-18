import axios from 'axios';

const BASE_URL = "http://localhost:5000";

export const addData = async (body) => {
    try {
        console.log("api,js" , body)
        const response = await axios.post(`${BASE_URL}/data`, body)
        if(response.status === 200){
            const status = response.status
            const { message } = response.data;
            return {status , message};
        }
        else{
            const status = response.status
            const {message} = response.data;
            return {status , message}
        }
    } catch (error) {
        console.log(error)
    }
}

export const getData = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/data?name=${name}`)
        if(response.status === 200){
            const status = response.status
            const { message , payload } = response.data;
            return {status , message , payload};
        }
        else{
            const status = response.status
            const {message} = response.data;
            const payload = null
            return {status , message , payload}
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/datas`)
        if(response.status === 200){
            const status = response.status
            const { message , payload } = response.data;
            return {status , message , payload};
        }
        else{
            const status = response.status
            const {message} = response.data;
            return {status , message}
        }
    } catch (error) {
        console.log(error)
    }
}