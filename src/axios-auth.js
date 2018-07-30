import axios from 'axios'

const authAPI = axios.create({
  // 設置axios的預設url
  // baseURL: 'https://vue-auth-ebeac.firebaseio.com'
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
})

// 設置header資訊
// authAPI.defaults.headers.common['Authorization'] = 'hsimao'
// authAPI.defaults.headers.get['Accepts'] = 'application/json'

export default authAPI