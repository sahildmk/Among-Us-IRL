// eslint-disable-next-line
import React from 'react';
import './App.css';
import Users from './loginFile.json';
import './Pages/HomePageStyle.css';
import './Pages/LoginStyle.css';
import reportBtn from './Images/Report-Button.png';

function App() {
	const [currPage, setCurrPage] = React.useState(0);
	const [currUser, setCurrUser] = React.useState(null);
	let userRole = null;

    const handleLogin = event => {
        event.preventDefault();
        const loginForm = document.forms.login;
        const uName = loginForm.username.value;
        const pWord = loginForm.password.value;
        const user = Users.find(user => user.username === uName);
        if (user === undefined) {
            alert("User not found!")
        } else if (user.password !== pWord) {
            alert("Password is incorrect!")
        } else {
			setCurrUser(user);
			userRole = user.role;
            setCurrPage(1);
        	localStorage.setItem('user', uName);
        }
    };

	if (currPage === 0 && currUser === null) {
		return (
			<div id="loginPage" className="page">
				<h1>Welcome!</h1>
				<form name="login" onSubmit={handleLogin}>
					<div id="loginForm">
						<div className="uName">
							<label name="username">Username: </label>
							<input name="username" type="text"></input> <br/>
						</div>
						<div className="pWord">
							<label name="password">Password: </label>
							<input name="password" type="password"></input> <br/>
						</div>
						<button id="loginBtn" type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div id="homePage">
			<div id="header">
				<p>You are a <span className={currUser.role}>{currUser.role}.</span></p>
			</div>
			<div id="tasks-title" className="crewmate">
				<p>Tasks!!</p>
			</div>
			<div id="tasks-content">
				hi
			</div>
				<img id="float-btn" className="report-btn" src={reportBtn}/>
			</div>
		);
	}
}

export default App;
