import axios from 'axios'

// Function to set the access token

const api = axios.create({
    withCredentials: true,
})

export default api
