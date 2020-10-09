import React from 'react';
import './LoginStyle.css';

function LoginPage() {
    const handleLogin = event => {
        event.preventDefault();
        const loginForm = document.forms.login;
        const uName = loginForm.username.value;
        const pWord = loginForm.password.value;
    };

    return (
        <div id="page">
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
}



export default LoginPage;