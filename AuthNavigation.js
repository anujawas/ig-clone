import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'

import { firebase } from './firebase'
import { useAuth } from './AuthContext'

const AuthNavigation = () => {
    const { currentUser } = useAuth()

    const [currentUserlogin, setCurrentUserlogin] = useState(null);
    const userHandler = user =>
        user ? setCurrentUserlogin(user) : setCurrentUserlogin(null)


    useEffect(() =>
        firebase.auth().onAuthStateChanged(user => userHandler(user))
        , [])
    return <>{currentUserlogin && currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation