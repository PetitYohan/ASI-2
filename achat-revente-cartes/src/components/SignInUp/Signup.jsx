import { useInput } from "./input-hook";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Login = () => {
  const { value: name, bind: bindName, reset: resetname } = useInput("");
  const { value: uname, bind: bindUname, reset: resetUname } = useInput("");
  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");
  const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await register();
    resetname();
    resetUname();
    resetLogin();
    resetPwd();
    resetEmail();
  };

  async function register() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastName: name, surName: uname, pwd: pwd }),
    };
    const resp = await fetch(
      "http://127.0.0.1/api/auth/register",
      requestOptions
    ).then((response) => response.json());

    navigate("/");
  }

  return (
    <>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div class="container">
          <label for="name">
            <b>LastName</b>
          </label>
          <input
            type="text"
            {...bindName}
            placeholder="Enter LastName"
            required
          ></input>

          <label for="surname">
            <b>Surname</b>
          </label>
          <input
            type="text"
            placeholder="Enter Surname"
            {...bindUname}
            required
          ></input>

          <label for="login">
            <b>Login</b>
          </label>
          <input
            type="text"
            placeholder="Enter Login"
            {...bindLogin}
            required
          ></input>

          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            {...bindPwd}
            required
          ></input>

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            {...bindEmail}
            required
          ></input>
          <button type="submit" class="loginbtn">
            Login
          </button>
        </div>

        <div class="container">
          <button type="button" class="cancelbtn">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
