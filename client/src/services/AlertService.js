export default {
  alert: (props, message, isSuccess) => {
    props.setAlerts({
      message,
      isSuccess
    })
  }
}