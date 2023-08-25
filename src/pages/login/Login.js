import React,{ useState } from 'react';
import PropTypes from 'prop-types';

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return(
    <form>
      {/* <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
      <div>
        <button type="submit">Submit</button>
      </div> */}
    </form>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }