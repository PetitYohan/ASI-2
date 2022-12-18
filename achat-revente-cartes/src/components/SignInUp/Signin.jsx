import { useInput } from "./input-hook"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../core/actions"
import { selectUser } from "../../core/selectors"
import "./Signin.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { userService } from "../../core/service/userService"

const Login = () => {
	const dispatch = useDispatch()
	const { value: uname, bind: bindUname, reset: resetUname } = useInput("")
	const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("")
	const userSelect = useSelector(selectUser)
	const navigate = useNavigate()

	const handleSubmit = async (evt) => {
		evt.preventDefault()
		await login()
		resetUname()
		resetPwd()
	}

	async function login() {
		{
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: uname, password: pwd }),
			}
			//TODO catch error => popup alert
			const resp = await fetch(
				"http://localhost/api/auth/login",
				requestOptions
			)
			if (resp.status === 200) {
				const user = await resp.json()
				console.log("login ok user : ")
				dispatch(setUser(user))
				userService.login(user)
			} else {
				alert("Error encountered while login")
			}
		}
	}

	useEffect(() => {
		nav()
	}, [userSelect])

	function nav() {
		if (userSelect.login !== undefined) {
			navigate("/home")
		}
	}

	return (
		<div>
			<h3>Sign In</h3>
			<form onSubmit={handleSubmit}>
				<div className="imgcontainer">
					<img
						src="/src/assets/profil_logo.png"
						alt="Avatar"
						className="avatar"
					></img>
				</div>

				<div className="container">
					<label htmlFor="uname">
						<b>Username</b>
					</label>
					<input
						type="text"
						{...bindUname}
						placeholder="Enter Username"
						required
					></input>

					<label htmlFor="pwd">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						{...bindPwd}
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
