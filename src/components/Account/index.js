import React, {useContext, useState} from 'react'
import {FirebaseContext} from '../Firebase'

const AccountPage = () => {
    const firebase = useContext(FirebaseContext)

    return (
        <div>
            <h1>AccountPage</h1>
            <p>{firebase.auth.currentUser.email}</p>
        </div>
    )
}

export default AccountPage;