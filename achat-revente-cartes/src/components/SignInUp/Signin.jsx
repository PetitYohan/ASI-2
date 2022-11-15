import "./Signin.css";

const Login = () => {
  return (
    <>
      <h3>Sign In</h3>
      <form action="action_page.php" method="post">
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
            placeholder="Enter Username"
            name="uname"
            required
          ></input>

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
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
