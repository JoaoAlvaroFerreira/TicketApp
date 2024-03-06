import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import * as k from './../Utils/constants'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e) {

        e.preventDefault()

        if (email && password) {
            //const salt = bcrypt.genSaltSync(10) commented to re-use the same salt
            const salt = k.salt
            const passwordHash = bcrypt.hashSync(password, salt)

            fetch(`${k.localhost}${k.user_api}${k.login_api}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: passwordHash,
                }),
            })
            .then((response) => {
                if(response.status == '200'){
                    localStorage.setItem('email', email)
                    props.login()
                }
              })
            .catch(error => console.error(error));
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        E-Mail:
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}

export default Login;
