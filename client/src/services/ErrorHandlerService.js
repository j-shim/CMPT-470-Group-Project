import CONSTANTS from '../constants/constants'

export default {
  handleError: (err) => {
    if (err && err.response && err.response.data) {
      if (err.response.status === 401) {
        // Invalid token
        console.error(err.response.data.message)
        window.alert(err.response.data.message + ': Please log in')
        localStorage.removeItem(CONSTANTS.TOKEN_KEY)
        localStorage.removeItem('470isLoggedIn')
        document.getElementById('logout-button').click()
      } else {
        console.error(err.response.data.message)
        window.alert(err.response.data.message)
      }
    } else {
      console.error(err)
      window.alert(err)
    }
  }
}