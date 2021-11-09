import React, { useContext, useEffect } from 'react'
import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    const { isAuth, user, LoadUser, Logout } = authContext

    useEffect(() => {
        LoadUser();
        // eslint-disable-next-line
    }, [])

    const onLogout = () => {
        Logout();
    }

    const GuestLinks = (
        <Fragment>
            <li><button><Link to='/random_page'>Random</Link></button></li>
            <li><button><Link to='/login'>Login</Link></button></li>
        </Fragment>
    )
    const AuthenticatedLinks = (
        <Fragment>
            <li><button><Link to='/'>Dashboard</Link></button></li>
            <li><button><Link to='/'>👤 {user && user.user_name}</Link></button></li>
            <li><button><Link to='/find_school'>Find School</Link></button></li>
            <li><button><Link to='/schedule'>Schedule</Link></button></li>
            <li>
                <button>
                    <a onClick={onLogout} href="#!">
                        <i className="fas fa-sign-out-alt" />{" "}
                        <span className="">Logout</span>
                    </a>
                </button>
            </li>
        </Fragment>
    )
    
    return (
        <div>
            <ul>
                {/* <li><Link to='/'>Home</Link></li> */}
                {isAuth ? AuthenticatedLinks : GuestLinks}
            </ul>
        </div>
    )
}

export default Navbar
