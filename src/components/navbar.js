import React from 'react';
import { connect } from 'react-redux';

import GoogleAuth from './google-auth';
import Logo from '../images/logo.png'

const Navbar = (props) => {
    let [scrolled, setScrolled] = React.useState(false)

    React.useEffect(()=>{
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 90;
            if (isTop !== true) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });
    }, [])
    return(<nav className= {scrolled || !props.isSignedIn ? 'stickybar' : 'nav-bar'}>

        <div className="nav-logo">
            <img src={Logo} alt="we_buy_houses" className="nav-logo"/>
        </div>
        <div className="nav-auth"><GoogleAuth /></div>

    </nav>)
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps)(Navbar);