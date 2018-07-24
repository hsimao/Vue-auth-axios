<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>your Email addrs: {{email}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  created() {
    this.$http.get('/users.json')
      .then(res => {
        const data = res.data
        const users = []
        // 將firebase 產生的id合併整理到user內層
        // 重新將資料整理到新的陣列內users
        for (let key in data) {
          const user = data[key]
          user.id = key
          users.push(user)
          this.email = users[0].email
        }
      })
      .catch(error => console.log(error))
  }
}
</script>
<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>