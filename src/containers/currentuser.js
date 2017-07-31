// pust current user stuff here
import { connect } from 'react-redux'
import { setUser } from '../actions'
import Form from "../components/UserSpace"

const currentUser = (userData, status) => {
    switch (status) {
      case "SET_USER":
        return userData
      default:
        return userData
    }
}


const mapStateToProps = state => {
  return {
    userName: currentUser("testy", "SET_USER")
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userName => {
      dispatch(setUser(userName))
    }
  }
}



const UserNow = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

export default UserNow
