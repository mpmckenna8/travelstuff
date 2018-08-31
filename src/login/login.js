import React from 'react'


const Login = ( {params}) => {
return (
  <div className="container">

      <div className="col-sm-6 col-sm-offset-3">

          <h1><span className="fa fa-sign-in"></span> Login</h1>

          <div className="alert alert-danger">

          </div>

          <form action="/login" method="post">
              <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" name="email" >
                  </input>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" />
              </div>

              <button type="submit" className="btn btn-warning btn-lg">Login</button>
          </form>

          <hr/>

          <p>Need an account? <a href="/signup">Signup</a></p>
          <p>Or go <a href="/">home</a>.</p>

      </div>

  </div>
)

}

export default Login;
