import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { checkToken } from "../../Api/AuthCheck";

import React, { useState, useEffect } from "react";
import { authenticate, checkServerSideCookie } from "Redux/actions/authActions";

//COMPONENTS
// import { Card, CardWrapper } from "Component/Card";
import { Row, Col } from 'antd';
import RegistrationForm from "../../Component/RegistrationForm";

import { wrapper } from "../../Redux";
import { connect } from "react-redux";

import { Loader } from "../../Component/Loader";


//SERVICES
// import firebase from "../../firebase";



const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const tailLayout = {
    wrapperCol: {
        // offset: 8,
        span: 24,
    },
};

const testCase = () => {
    return true;
};

const SignUp = ({ token, step, id }: any) => {
    const router = useRouter();
    const [pageLoad, setPageLoad] = useState(true);

    useEffect(() => {

        if (token) {
            if (step != "current") {
                Router.push(step);
                return
            }
            setPageLoad(false);
        } else {
            Router.push("/login");
        }
    }, []);

    // if (pageLoad) {
    // if (step != "current" && step != "logout") {
    if (pageLoad) {
        return <Loader></Loader>;
    }
    // }
    // }

    return (
        <div className="full-height">
            <div className="full-page padding">
                <Row>
                    <Col span={12}>
                        <div className="sign-in-left">
                            <img src="/images/logo.svg" className="mb-50"></img>

                            <div className="mb-25">
                                <div className="h1-text">
                                    Welcome to LinkedInMate
                                </div>

                                <div className="h1-sub-text">
                                    Tell us a little about yourself
                                </div>
                            </div>

                            <div className="reg-form mb-50">
                                <RegistrationForm token={token} id={id}></RegistrationForm>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="grey full-height text-center sign-in-right-top-second">
                            <img width="60%" src="/images/welcome.svg"></img>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        checkServerSideCookie(context);
        const token = context.store.getState().authentication.token;

        if (!token) {
            return {
                props: {
                    token: null,
                    isLoggedIn: false,
                    step: "logout"
                },
            };
        }

        try {
            const response: any = await checkToken(token);
            let step = "current";
            // response.data.step = "login"


            if (response.data.step !== undefined) {
                if (response.data.step == "login") {
                    step = "current";
                }

                if (response.data.step == "signup") {
                    step = "/linkedin-connect";
                }

                if (response.data.step == "linkedin-connect") {
                    step = "/dashboard";
                }
            }

            return {
                props: {
                    token: token,
                    step: step,
                    id: response.data._id
                },
            };
        } catch (err) {
            if (err.response.status == 401) {
                return {
                    props: {
                        token: null,
                        step: "logout"
                    },
                };
            }
        }
    }
);

export default connect((state: any) => state, { authenticate })(SignUp);
