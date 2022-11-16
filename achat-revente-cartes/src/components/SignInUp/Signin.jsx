import { useInput } from "./input-hook";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../core/actions";
import { selectUser } from "../../core/selectors";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { value: uname, bind: bindUname, reset: resetUname } = useInput("");
  const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("");
  const userSelect = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login();
    getUser();
    resetUname();
    resetPwd();
    nav();
  };

  function nav() {
    if (userSelect !== undefined) {
      navigate("/home");
    }
  }

  async function login() {
    {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: uname, password: pwd }),
      };
      const resp = await fetch(
        "https://asi2-backend-market.herokuapp.com/auth",
        requestOptions
      ).then((response) => response.json());
      getUser(resp);
    }
  }

  async function getUser(userId) {
    if (userId != undefined) {
      if (Number.isInteger(userId)) {
        const fetchData = async () => {
          const resp = await fetch(
            "https://asi2-backend-market.herokuapp.com/user/" + userId
          );
          const user = await resp.json();
          dispatch(setUser(user));
        };
        fetchData();
      }
    }
  }

  return (
    <>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div class="imgcontainer">
          <img
            src="./src/assets/profil_logo.png"
            alt="Avatar"
            class="avatar"
          ></img>
        </div>

        <div class="container">
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            {...bindUname}
            placeholder="Enter Username"
            required
          ></input>

          <label for="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            {...bindPwd}
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
