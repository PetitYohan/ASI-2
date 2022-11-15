import "./Signin.css";

const Login = () => {
  return (
    <>
      <h3>Sign Up</h3>
      <form action="action_page.php" method="post">
        <div class="container">
          <label for="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Surname"
            name="name"
            required
          ></input>

          <label for="surname">
            <b>Surname</b>
          </label>
          <input
            type="text"
            placeholder="Enter Surname"
            name="surname"
            required
          ></input>

          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          ></input>

          <label for="repassword">
            <b>Re-Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Re-Password"
            name="repassword"
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
