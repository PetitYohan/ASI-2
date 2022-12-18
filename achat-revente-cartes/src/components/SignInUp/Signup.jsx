import { useInput } from "./input-hook"
import "./Signin.css"

const Login = () => {
	const { value: name, bind: bindName, reset: resetname } = useInput("")
	const { value: uname, bind: bindUname, reset: resetUname } = useInput("")
	const { value: login, bind: bindLogin, reset: resetLogin } = useInput("")
	const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("")
	const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")

	const handleSubmit = async (evt) => {
		evt.preventDefault()
		await register()
		resetname()
		resetUname()
		resetLogin()
		resetPwd()
		resetEmail()
	}

	async function register() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				lastName: name,
				surName: uname,
				login: login,
				pwd: pwd,
				email: email,
			}),
		}
		const resp = await fetch(
			"http://localhost/api/auth/register",
			requestOptions
		).then((response) => response)
		if (resp.status === 200) {
			alert("User created, you can now login with the Sign In section 😊")
		} else {
			alert("Error encountered while registering")
		}
	}

	return (
		<div>
			<h3>Sign Up</h3>
			<form onSubmit={handleSubmit}>
				<div className="container">
					<label htmlFor="name">
						<b>LastName</b>
					</label>
					<input
						type="text"
						{...bindName}
						placeholder="Enter LastName"
						required
					></input>

					<label htmlFor="surname">
						<b>Surname</b>
					</label>
					<input
						type="text"
						placeholder="Enter Surname"
						{...bindUname}
						required
					></input>

					<label htmlFor="login">
						<b>Login</b>
					</label>
					<input
						type="text"
						placeholder="Enter Login"
						{...bindLogin}
						required
					></input>

					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						{...bindPwd}
						required
					></input>

					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="text"
						placeholder="Enter Email"
						{...bindEmail}
						required
					></input>
					<button type="submit" className="loginbtn">
						Login
					</button>
				</div>

				<div className="container">
					<button type="button" className="cancelbtn">
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
export default Login
