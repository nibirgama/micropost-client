import React from 'react'
import Router, { useRouter } from "next/router";
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Drawer, Row } from 'antd'
import { useDispatch } from "react-redux";
import { deauthenticate } from "@Redux/actions/authActions";


export default function HeaderMenu(props: any) {

    let myNav: any;
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    useEffect(() => {

        myNav = document.getElementById('header-menu-container');

        window.addEventListener('scroll', handleScroll, true);
    }, []);

    let handleScroll = () => {
        if (document.body.scrollTop >= 200) {
            myNav.classList.add("nav-colored");
            myNav.classList.remove("nav-without-colored");
        }
        else {
            myNav.classList.add("nav-without-colored");
            myNav.classList.remove("nav-colored");
        }

    }

    return (
        <div>


            <div id="header-menu-container" className="header-menu-container full-width">
                <div className="desktop-menu header-menu flex space-between full-width">

                    <div className="left-menu flex flex-center-v">
                        <div className="menu-logo mr-20">
                            <div className="header-menu-item helvetica text-24">Microblog</div>
                        </div>
                        <div className="header-menu-items">
                            <div className="header-menu-item helvetica">Home</div>
                            {props.token ? (
                                <>
                                    <div
                                        onClick={() => {
                                            Router.push("/create-post");
                                        }}
                                        className="header-menu-item helvetica">Create Post</div>

                                    <div
                                        onClick={() => {
                                            dispatch(deauthenticate());
                                            // Router.push("/");
                                        }}
                                        className="header-menu-item helvetica">Logout</div>
                                </>
                            ) : (
                                <>
                                    <div
                                        onClick={() => {
                                            Router.push("/login");
                                        }}
                                        className="header-menu-item helvetica">Login</div>

                                    <div
                                        onClick={() => {
                                            Router.push("/register");
                                        }}
                                        className="header-menu-item helvetica">Register</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-menu">
                    <img onClick={() => { setVisible(true) }} src="/images/ham.svg"></img>
                </div>
            </div>


            <div>

            </div>

            <Drawer
                title="Menu"
                placement="left"
                closable={false}
                onClose={() => { setVisible(false) }}
                visible={visible}
            // key={placement}
            >
                <p>Home</p>
                <p>Login</p>
            </Drawer>

        </div>
    )
}