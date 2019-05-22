import React ,{useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../Firebase'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { format } from 'path';


const SignInWithGoogleBase = props => {
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    const onSubmit = event => {
        firebase.doSignInWithGoogle().then(
            authUser => {
                setError(null);
                props.history.push(ROUTES.HOME);
            }
        ).catch(
            error => {
                setError(error);
            }
        )
    }
    return (
        <div className="SignInWithGoogleDiv">
            <form onSubmit={onSubmit} className="SignInWithGoogleForm">
                <button type="submit" className="SignInWithGoogleButton">
                    Sign In With Google
                </button>
            </form>
        </div>
    )
}

const SignInWithGoogle = withRouter(SignInWithGoogleBase);

export default SignInWithGoogle;