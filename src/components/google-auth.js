import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

const GoogleAuth = (props) => {
    React.useEffect(() => {
        window.auth = null;
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '236824456110-da7v4p79hjlfhiuc8k43gemrefcpkjof.apps.googleusercontent.com',
                scope: 'email'
            }).then(async ()=>{
                window.auth = window.gapi.auth2.getAuthInstance();
                onAuthChange(window.auth.isSignedIn.get())
                window.auth.isSignedIn.listen(onAuthChange);
            })
        })
    }, [])

    const renderAuthButton = () => {
        if (props.isSignedIn === null) {
            return null;
        } else if(props.isSignedIn === true) {
            return<div><a onClick={window.auth.signOut}>Sign Out</a></div>
        } else {
            return<div><a onClick={window.auth.signIn}>Sign In</a></div>
        }
    }

    const onAuthChange = isSignedIn => {
        if(isSignedIn) {
            props.signIn(window.auth.currentUser.get().getId())
        } else {
            props.signOut()
        }
    }

    return(<div>
        {renderAuthButton()}
    </div>)
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);