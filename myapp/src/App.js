import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { addData, showData } from './api'

function App() {

  const [signup, setSignup] = useState(false)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value
    setError(null);
    setData({ ...data, [name]: value })
    console.log(data)
  }


  const handleClick = async (e) => {
    e.preventDefault()
    try {
      console.log('Before API request');
      await addData(data);
      console.log('Signup successful:', data);

      console.log('Before setting signup to true');
      setSignup(true);
      
      console.log('After setting signup to true');
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // Update state to store the error message
        setError(error.response.data.message);
      } else {
        // Handle other types of errors (e.g., server errors)
        console.error('Server error:', error.response.data);
      }
    }
  };

  const [error, setError] = useState(null);

  const [user,setUser] = useState([])

  useEffect(()=>{
    if (signup){
      getUserdata()
    }
  },[signup])

  const getUserdata = async () => {
    try {
      const response = await showData();
      setUser(response);
      console.log(response, 'user=======');
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>


      {!signup ? (
        <div className="container">
          <div className="card">
            <div className="card-left">
              <div className="semi-left">
                <div className="altitudeCard">
                  <div className="altitudeCardData">
                    <h3>Altitude Air</h3>
                    <hr style={{ width: '20%' }}></hr>
                    <p>We promise to onsure that your wel-boing is taken care of while
                      travelling with Us. Boasting top in class fleet inventory and a5star
                      approval for our in-flight experience. you know you're getting the
                      best from Altitude with no attitude.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-right">
              <div className="form">
                <h3>Explore & Experience</h3>
                <p>Get onto your most comfortable journey yet. All the way up.</p>

                <form className="form-main">
                  <div className="formnames">
                    <input name="firstname" value={data.firstname} type="text" onChange={handleChange} placeholder="First Name" className="field" required={true}></input>
                    <input name="lastname" value={data.lastname} type="text" onChange={handleChange} placeholder="Last Name" className="field"></input>
                  </div>
                  <input name="email" value={data.email} type="email" onChange={handleChange} placeholder="Email" className="fields"></input>
                  <input name="username" value={data.username} type="text" onChange={handleChange} placeholder="Username" className="fields"></input>
                  <input name="password" value={data.password} type="password" onChange={handleChange} placeholder="Password" className="fields"></input>
                  <input name="confirmpassword" value={data.confirmpassword} type="password" onChange={handleChange} placeholder="Confirm Password" className="fields"></input>
                  <button onClick={handleClick} className="button">GET STARTED</button>
                  {error && <div className="error-message">{error}</div>}
                </form>
              </div>

            </div>
          </div>
        </div>
      ) :
        <>
          <h1>users lists</h1>
         
          {user.length > 0 && (
  <table style={{ width: '50%' }}>
    <thead>
      <tr>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Email</th>
        <th>Username</th>
        <th>Password</th>
      </tr>
    </thead>
    <tbody>
      {user.map((data, index) => (
        <tr key={index}>
          <td>{data.firstname}</td>
          <td>{data.lastname}</td>
          <td>{data.email}</td>
          <td>{data.username}</td>
          <td>{data.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </>
      }
    </>
  );
}

export default App;
