export default {
  handleError: (err) => {
    if (err && err.response && err.response.data) {
      console.error(err.response.data.message)
      window.alert(err.response.data.message)
    } else {
      console.error(err)
      window.alert(err)
    }
  }
}