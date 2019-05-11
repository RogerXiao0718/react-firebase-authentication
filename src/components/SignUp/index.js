import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext} from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignUpLink />
    </div>
)

const SignUpForm = (props) => {
    const initialFormState = {
        username: '',
        email: '',                 
        password: '',
        passwordAgain: '',   // For password confirmation
    }
    const [formState, setFormState] = useState(initialFormState)

    const [error, setError] = useState(null)
    const isValid = (
        formState.username !== '' &&
        formState.email !== '' &&
        formState.password === formState.passwordAgain &&
        formState.password !== ''
    )
    const firebase = useContext(FirebaseContext)

    const onSubmit = event => {
        event.preventDefault();
        const {email, password} = formState

        firebase.doCreateUserWithEmailAndPassword(email, password)
        .then( authUser =>{ 
            setFormState({...initialFormState})
        })
        .catch( error => {
            setError(error)
        } )
    }

    const onChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='sign-up-form'>
            <form onSubmit={onSubmit}>
                UserName: <input type='text' name='username' onChange={onChange} placeholder='User Name' value={formState.username} />
                <hr />
                Email Address: <input type='text' name='email' onChange={onChange} placeholder='Email Adress' value={formState.email} />
                <hr />
               Password: <input type='password' name='password' onChange={onChange} placeholder='Password' value={formState.password} />
                <hr />
                PasswordAgain: <input type='password' name='passwordAgain' onChange={onChange} placeholder='Password Confirm' value={formState.passwordAgain} />
                <hr />

                <button disabled={!isValid} type='submit'>Sign Up</button>
                { error && <p>{ error.message }</p> }
            </form>
        </div>
    )
}

const SignUpLink = (props) => (
    <div>
        <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>'</p>
    </div>
)

export default SignUpPage
export { SignUpForm, SignUpLink }
