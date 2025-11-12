import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASEURL + "user/register",
        {
          username,
          name,
          email,
          password,
          confirmPass,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/"); // ✅ Redirect to login page
      } else {
        alert(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      <div className="signupWrapper">
        <div className="signupRight">
          <div className="signupRightTop">
            <div className="signupRightTopTop">
              <span className="signupRightTopLogo">sasta-instagram</span>
            </div>
            <div className="signupRightTopForm">
              <form className="signupBox" onSubmit={handleRegister}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                  className="signupInput"
                />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  type="text"
                  required
                  className="signupInput"
                />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  type="text"
                  required
                  className="signupInput"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  required
                  minLength="3"
                  className="signupInput"
                />
                <input
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm Password"
                  type="password"
                  required
                  minLength="3"
                  className="signupInput"
                />
                <button
                  type="submit"
                  className="signupButton"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
          <div className="signupRightBottom">
            <center>
              <span>Have an account? </span>
              <Link to="/" style={{ textDecoration: "none" }}>
                <span className="SignUptext">Log in</span>
              </Link>
            </center>
          </div>
        </div>
      </div>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 100px;
  justify-content: center;

  .signupRight {
    flex: 1;
    display: flex;
    height: max-content;
    justify-content: center;
    flex-direction: column;
    max-width: 420px; /* ⬅️ increased from 360px */
    border: 1px solid #d6d6d6;
    padding: 20px 25px; /* ⬅️ added horizontal padding */
    border-radius: 8px;
    background-color: #fff;

    @media (max-width: 877px) {
      justify-content: center;
    }
  }

  .signupWrapper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
  }

  .signupRightTop {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .signupRightTopTop {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 35px 0;
  }

  .signupRightTopLogo {
    font-family: "Dancing Script", cursive;
    font-size: 60px;
    font-weight: bold;
  }

  .signupBox {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%; /* ⬅️ increased from 70% */
    padding-bottom: 20px;
  }

  .signupInput {
    height: 40px; /* ⬅️ taller */
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 15px; /* ⬅️ slightly larger font */
    margin-bottom: 12px;
    padding: 0px 10px; /* ⬅️ more padding inside */
    background-color: #fafafa;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #0095f6;
      background-color: #fff;
      box-shadow: 0 0 0 2px rgba(0, 149, 246, 0.2);
    }
  }

  .signupButton {
    margin-top: 10px;
    width: 100%;
    height: 35px; /* ⬅️ slightly taller */
    background-color: #0095f6;
    color: white;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #0078cc;
    }

    &:disabled {
      background-color: #b2dffc;
      cursor: not-allowed;
    }
  }

  .SignUptext {
    color: #0095f6;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default Register;
