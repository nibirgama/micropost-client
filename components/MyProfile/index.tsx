import Router, { useRouter } from "next/router";
import Link from 'next/link'

import React, { useState, useEffect } from "react";
import { Menu, Dropdown } from 'antd';
import { useDispatch } from "react-redux";
import { deauthenticate, reauthenticate } from "../../Redux/actions/authActions";


// CSS
import './index.less';


const MyProfile = (props: any) => {

    const dispatch = useDispatch();

    const handleMenuClick = (e: any) => {

        if (e.key == 0) {
            Router.push("/profile");
        }

        if (e.key == 4) {
            Router.push("/app/settings");
        }

        if (e.key == 5) {
            dispatch(deauthenticate());
            Router.push("/login");
        }
    }


    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="0">
                <Link href="/profile">
                    <div className="flex flex-center-v">
                        <img className="mr-10" src="/images/profile-user.svg"></img>
                        Profile Settings
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="1" disabled>
                <div className="flex flex-center-v">
                    <img className="mr-10" src="/images/profile-billing.svg"></img>
                    Billing
                    {/* <a href="/billing">Billing</a> */}
                </div>
            </Menu.Item>
            <Menu.Item key="2" disabled>
                <div className="flex flex-center-v">
                    <img className="mr-10" src="/images/profile-camera.svg"></img>
                    Getting Started
                    {/* <Link href="">Getting Started</Link> */}
                </div>
            </Menu.Item>
            <Menu.Item key="3" disabled>
                <div className="flex flex-center-v">
                    <img className="mr-10" src="/images/profile-knowledge.svg"></img>
                    {/* <Link href="">Knowledge Base</Link> */}
                    Knowledge Base
                </div>
            </Menu.Item>
            <Menu.Item key="4">
                <div className="flex flex-center-v">
                    <img className="mr-10" src="/images/profile-setting.svg"></img>
                    {/* Setting */}
                    <a href="/app/settings">Setting</a>
                </div>
            </Menu.Item>
            <Menu.Item key="5">
                <div className="flex flex-center-v" onClick={() => {
                    // dispatch(deauthenticate());
                    // Router.push("/login");
                }}>
                    <img className="mr-10 flex flex-center-v" src="/images/logout.svg"></img>
                    <span>Logout</span>
                </div>
            </Menu.Item>
        </Menu >
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div>
                <div className="flex flex-center-v text-right flex-end">
                    <div><img className="mr-10 profile-circle-avater" src={props.user != null ? props.user.profilePicture : ""}></img></div>
                    <div className="link-color mr-10">{props.user != null ? props.user.fname + " " + props.user.lname : ""}</div>

                    <div className="link-color mr-10"><img src='/images/down.svg' /></div>

                </div>
            </div>
        </Dropdown>
    );
};

export default MyProfile