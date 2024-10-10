import { accessToken } from '@/lib/utils'
import axios from 'axios'

const api = axios.create()

api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken

export default api
