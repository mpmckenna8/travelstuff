import React from 'react'
import PropTypes from 'prop-types'



class Form extends React.Component {
  render(state) {
    console.log('current state of form: ', this, state);

    var userdisplay = this.props.userName;

    var usernamediv = (<div></div>)
    if(userdisplay){
      usernamediv = <div>User: {userdisplay}</div>
    }

  return (
    <div>
    {usernamediv}
        <div className="loginArea col-sm-6 col-sm-offset-3">
        <h4><span className="fa fa-sign-in"></span> Login</h4>
        <form id="loginform" method="POST" action="http://localhost:8080/auth/login" >

                <label>Email</label>
                <input type="text" className="form-control" name="email" />
                <label>Password</label>
                <input type="password" className="form-control" name="password" />

            <button type="submit" className="btn btn-warning btn-lg">Login</button>
        </form>
        <p>Need an account? <a href="http://localhost:8080/signup">Signup</a></p>
        <p>Or go <a href="/">home</a>.</p>
    </div>
    </div>
  )
}

  componentDidMount() {

  // Access the form element...
  if (this.props.userName) {
    console.log('thres a username', this.props.userName)
  }
  console.log('mounted form ,', this)
    var form = document.getElementById("loginform");



  form.onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();

    // collect the form data while iterating over the inputs
    var data = {'bleepy':'bloop'};

    for (var i = 0, ii = form.length; i < ii; ++i) {
      var input = form[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }


    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;

    // Turn the data object into an array of URL-encoded key/value pairs.
      for(name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }
      // Combine the pairs into a single string and replace all %-encoded spaces to
        // the '+' character; matches the behaviour of browser form submissions.
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        // Define what happens on successful data submission
        XHR.addEventListener('load', function(event) {
          alert('Yeah! Data sent and response loaded.');
          console.log(event.target.response)
        });

        // Define what happens in case of error
        XHR.addEventListener('error', function(event) {
          alert('Oups! Something goes wrong.');
        });

        // Set up our request
        XHR.open('POST', 'http://localhost:8080/auth/login');

        // Add the required HTTP header for form data POST requests
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Finally, send our data.
        XHR.send(urlEncodedData);


    };
}

}

Form.propTypes = {
  userName: PropTypes.string
}


export default Form;
