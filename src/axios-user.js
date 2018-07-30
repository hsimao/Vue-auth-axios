import axios from 'axios'

const userAPI = axios.create({
  // 設置axios的預設url, 編輯修改資料庫的api
  baseURL: 'https://vue-auth-ebeac.firebaseio.com'
})

export default userAPI