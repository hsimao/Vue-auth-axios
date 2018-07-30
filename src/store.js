import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth'
import axiosUser from './axios-user'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    userEmail: null,
    user: null
  },

  mutations: {
    authUser(state, userData) {
      state.idToken   = userData.token
      state.userId    = userData.userId
      state.userEmail = userData.email
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuth(state) {
      state.idToken   = null
      state.userId    = null
      state.userEmail = null
      state.user      = null
    }
  },

  actions: {
    // 驗證註冊
    signup({ commit, dispatch }, authData) {
      signAPI('signupNewUser', authData, commit, dispatch)
    },
    // 驗證登入
    login({ commit }, authData) {
      signAPI('verifyPassword', authData, commit)
    },
    // 驗證註冊成功後，將資料存到user資料庫
    storeUser({ commit, state }, userData) {
      if (!state.idToken) return
      axiosUser.post(`/users.json?auth=${state.idToken}`, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    // 驗證完後從資料庫取得匹配user資料, 重新格式化後將資料存到state
    fetchUser({ commit, state }) {
      if (!state.idToken) return
      axiosUser.get(`/users.json?auth=${state.idToken}`)
      .then(res => {
        const data = res.data
        const users = []
        for (let key in data) {
          const user = data[key]
          user.id = key
          users.push(user)
          if (user.email === state.userEmail) commit('storeUser', data[key])
        }
      })
      .catch(error => console.log(error))
    },
    logout({ commit }) {
      commit('clearAuth')
      router.replace('/signin')
    }
  },

  getters: {
    user(state) {
      return state.user
    },
    isLogin(state) {
      return state.idToken !== null
    }
  }
})

// signAPI 驗證方法封裝
function signAPI(url, data, commit, dispatch) {
  axiosAuth.post(`/${url}?key=AIzaSyCykZy7KhMihbBxixnzXs2mKBkA1TrMv2s`, {
    email: data.email,
    password: data.password,
    returnSecureToken: true
  })
    .then( res => {
      commit('authUser', {
        token: res.data.idToken,
        userId: res.data.localId,
        email: res.data.email
      })
      if (url === 'signupNewUser') dispatch('storeUser', data)
    })
    .catch( error => { console.log(error) })
}