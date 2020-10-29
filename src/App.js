// eslint-disable-next-line
import React from 'react';
import './App.css';
import dbOject from './db.json';
import roleStyles from './roleStyles.json';
import './Pages/HomePageStyle.css';
import './Pages/LoginStyle.css';
import reportBtn from './Images/Report-Button.png';

function App() {
	// localStorage.clear();
	const [currPage, setCurrPage] = React.useState(0);
	const [reportPopUp, setReportPopUp] = React.useState(false);
	const [users, setUsers] = React.useState(dbOject.users);
	// let Users = null;

	const getPlayers = () => {
		fetch("http://192.168.1.201:3001/users?id_ne=admin")
			.then(res => res.json())
			.then(r => {
				setUsers(r);
			})
			.catch(err => {
				alert(err);
			})
	}

	React.useEffect(() => {
		getPlayers();
	}, [])
	
	// console.log(getUsers());

	const handleReport = (event) => {
		event.preventDefault();
		const reportForm = document.forms.reportForm;
		const name = reportForm.user.value;
		const code = reportForm.code.value;
		const foundUser = users.find(user => user.id === name);
		
		try {
			if (foundUser !== undefined) {
				if (foundUser.id === name && foundUser.password === code) {
					fetch(`http://192.168.1.201:3001/users/${foundUser.id}`, {
						method: 'PUT',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify({
							"id": foundUser.id,
							"password": foundUser.password,
							"role": "Crewmate",
							"alive": "dead"
						})
					})
						.then(res => res.json())
						.then(r => {
							setReportPopUp(false);
							getPlayers();
						})
						.catch(err => {alert(err)})
				} else {
					throw new Error("Name or Code is incorrect")
				}
			} else {
				throw new Error("Name or Code is incorrect")
			}
		} catch (error) {
			alert(error);
		}
	}
	
    const handleLogin = event => {
		event.preventDefault();
        const loginForm = document.forms.login;
        const uName = loginForm.username.value;
		const pWord = loginForm.password.value;
        const user = dbOject.users.find(user => user.id === uName);
        if (user === undefined) {
			alert("User not found!")
        } else if (user.password !== pWord) {
            alert("Password is incorrect!")
        } else {
			localStorage.setItem('user', JSON.stringify(user));
            setCurrPage(1);
		}
	};
	
	const ReportPopUp = (props) => {
		return (
			<div className="reportPopUp">
				<form name="reportForm" className="reportForm">
					<div className="col lbl">
						<label>Name:</label>
						<br/>
						<label>Code:</label>
					</div>
					<div className="col">
						<input type="text" name="user"/>
						<br/>
						<input type="text" name="code"/>
					</div>
				</form>
				<div>
					<button className="reportBtn" onClick={(event) => {handleReport(event);}}>Confirm</button>
					<button className="reportBtn" onClick={() => {setReportPopUp(false)}}>Cancel</button>
				</div>
			</div>
		);
	}
	if (currPage === 0 && localStorage.getItem('user') === null) {
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
		const currUser = JSON.parse(localStorage.getItem('user'));	
		const article = (currUser.role === "Impostor") ? "an " : "a ";

		if (currUser.id === "admin") {
			return (
				<div id="homePage">
					<div id="header">
						<p><span style={roleStyles[currUser.role].txtColor}>ADMIN</span></p>
					</div>
					<div id="tasks-title" style={roleStyles[currUser.role].bkgColor}>
						<p>Game Status!</p>
					</div>
					<div id="playerGrid">
						{users.map(user => {
							return (
								<div key={user.id} className={`gridItem ${user.alive}`} >{user.id}</div>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div id="homePage">
					<div id="header">
						<p>You are {article}<span style={roleStyles[currUser.role].txtColor}>{currUser.role}</span>.</p>
					</div>
					<div id="tasks-title" style={roleStyles[currUser.role].bkgColor}>
						<p>Tasks!!</p>
					</div>
					<div id="tasks-content">
	
					</div>
					<img id="float-btn" className="report-btn" src={reportBtn} alt="report" onClick={() => {setReportPopUp(true)}}/>
					{reportPopUp ? <ReportPopUp/> : null}
				</div>
			);
		}

	}
}

export default App;
