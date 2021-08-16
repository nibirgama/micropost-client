import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { checkToken } from "../../Api/AuthCheck";

import React, { useState, useEffect } from "react";

import axios from "axios";

//REDUX
import { wrapper } from "../../Redux";
import { connect } from "react-redux";
import { authenticate, checkServerSideCookie } from "@Redux/actions/authActions";

// CSS
import "./index.less";

//COMPONENTS
import { Row, Col, message } from "antd";
import { Form, Input, Button, Divider, Modal, Space } from "antd";
// import { Loader } from "Component/Loader";
// import Register from "@components/Register";

let params: any;

const getQueryParams = (name: any, url: any) => {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}
let typeParam: any = "normal";

const Login = (props: any) => {

    let { authenticate, token } = props;

    const [pageLoad, setPageLoad] = useState(true);

    useEffect(() => {
        typeParam = getQueryParams('type', window.location.href);
        if (token) {
            Router.push("/");
            // setPageLoad(false);
        } else {
            setPageLoad(false);
        }
    }, []);


    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onFinish = (values: any) => {

        authenticate(
            { email: values.email, password: values.password },
            (success: any) => {
                Router.push("/");
            },
            (failed: any) => {
                message.error("Invalid data");
            },
            (error: any) => {
                message.error("Invalid data");
            }
        )
    };

    // if (step != "current" && step != "logout") {
    //     return <Loader></Loader>;
    // }

    // if (pageLoad) {
    //     return <Loader></Loader>;
    // }

    return (
        <div className="full-height">
            <div className="full-page padding">
                <Row>
                    <Col span={12}>
                        <div className="sign-in-left">

                            <div className="mb-25">
                                <div className="h1-text">
                                    Log in to Micropost
                                </div>

                                <div className="h1-sub-text">
                                    The simplest blog system
                                </div>

                                <div className="sign-in-buttons-container">
                                    <div className="mb-15 mt-40">

                                        <Form
                                            name="basic"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                            initialValues={{ remember: true }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[{ required: true, message: 'Please input your email!' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
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
                },
            };
        }

        try {
            const response: any = await checkToken(token);

            return {
                props: {
                    token: token,
                },
            };
        } catch (err) {
            if (err.response.status == 401) {
                return {
                    props: {
                        token: null
                    },
                };
            }
        }
    }
);

// let test = Login.testCase;
// console.log(test);
export default connect((state: any) => state, { authenticate })(Login);
// export default Login
// export default Login;
// export { Login as login, testCase }
