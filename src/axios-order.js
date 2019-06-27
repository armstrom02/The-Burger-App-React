import axios from 'axios';


const instance = axios.create({
baseURL : 'https://burger-app-13c1a.firebaseio.com/'
});


export default instance;