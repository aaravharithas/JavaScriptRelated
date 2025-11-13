import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'; // Import axios for making HTTP requests

function Login() {
  const navigate = useNavigate();
  const [show1, setshow1] = useState(1);
  const username = useRef();
  const password = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (show1 < 4) {
        setshow1(show1 + 1);
      } else {
        setshow1(1);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [show1]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    const userCredentials = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
  const response = await axios.post(import.meta.env.VITE_API_BASEURL + "user/login", userCredentials);

  if (response.status === 200 && response.data.token) {
    localStorage.setItem("token", response.data.token);
    navigate("/feed");
  } else {
    alert(response.data.message || "Invalid credentials");
  }
} catch (error) {
  if (error.response && error.response.status === 401) {
    alert("Invalid username or password");
  } else {
    alert("Error logging in. Please try again.");
  }
}
  };

  return (
    <LoginContainer>
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="frontImgWrapper">
            <img
              src={"/images/loginpage1.png"}
              className={show1 === 1 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"/images/loginpage2.png"}
              className={show1 === 2 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"/images/loginpage3.png"}
              className={show1 === 3 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
            <img
              src={"/images/loginpage4.png"}
              className={show1 === 4 ? "frontImg show" : "frontImg hide"}
              alt=""
            />
          </div>
        </div>
        <div className="loginRight">
          <div className="loginRightWrapper">
            <div className="loginRightTop">
              <div className="loginRightTopTop">
                <span className="loginRightTopLogo">Sasta instagram</span>
              </div>
              <div className="loginRightTopForm">
                <form className="loginBox" onSubmit={handleLogin}>
                  <input
                    placeholder="Username"
                    type="text"
                    required
                    className="loginInput"
                    ref={username}
                  />
                  <input
                    placeholder="Password"
                    type="password"
                    required
                    minLength="3"
                    className="loginInput"
                    ref={password}
                  />
                  <button type="submit" className="loginButton">Connect</button>
                </form>
              </div>
            </div>
            <div className="loginRightBottom">
              <center>
                <span></span>
              </center>
              <center>
                <span>Don't have an account?</span>
                <span
                  className="SignUptext"
                  onClick={() => {
                    navigate("/register"); // Navigate to register page
                  }}
                >
                  Sign up
                </span>
              </center>
            </div>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  .hide {
    opacity: 0;
    -webkit-transition: opacity 1.5s ease-out;
    transition: opacity 1.5s ease-out;
    visibility: visible;
  }
  .show {
    opacity: 1;
    -webkit-transition: opacity 1.5s ease-in;
    transition: opacity 1.5s ease-in;
    z-index: 2;
  }
  .loginWrapper {
    width: 100%;
    height: 70%;
    display: flex;
  }
  .loginLeft {
    flex: 1;
    display: flex;
    position: relative;
    width: 100%;
    height: 600px;
    background-image: url("/images/loginpage.png");
    min-width: 460px;
    background-repeat: no-repeat;
    background-position: right 2px;
    @media (max-width: 877px) {
      flex: 1;
      display: none;
    }
  }
  .frontImgWrapper {
    display: flex;
  }
  .frontImg {
    position: absolute;
    top: 28px;
    right: 59px;
  }
  .loginRight {
    flex: 1;
    display: flex;
    height: max-content;
    @media (max-width: 877px) {
      justify-content: center;
    }
  }
  .loginRightWrapper {
    width: 360px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 3px;
    padding-bottom: 10px;
  }

  .loginRightTop {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loginRightTopTop {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 35px 0;
  }
  .loginRightTopLogo {
    font-family: "Dancing Script", cursive;
    font-size: 50px;
    font-weight: bold;
  }
  .loginRightTopForm {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .loginBox {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 70%;
    padding-bottom: 20px;
  }
  .loginInput {
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 0px 5px;
  }
  .loginButton {
    margin-top: 10px;
    width: 100%;
    height: 25px;
    background-color: #0095f6;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }
  .SignUptext {
    color: #0095f6;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default Login;
