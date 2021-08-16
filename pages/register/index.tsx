import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { checkToken } from "../../Api/AuthCheck";

import React, { useState, useEffect } from "react";

import axios from "axios";

//REDUX
import { wrapper } from "../../Redux";
import { connect } from "react-redux";
import { authenticate, checkServerSideCookie, signUp } from "@Redux/actions/authActions";

// CSS
// import "./index.less";

//COMPONENTS
import { Row, Col, message } from "antd";
import { Form, Input, Button, Divider, Modal, Space } from "antd";
import { Loader } from "Component/Loader";
// import Register from "@components/Register";

const Register = (props: any) => {

    let { authenticate, token } = props;

    const [pageLoad, setPageLoad] = useState(true);

    useEffect(() => {

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

        signUp(
            { email: values.email, password: values.password },
            (success: any) => {
                message.success("Registration Completed");
                Router.push("/login");
            },
            (failed: any) => {
                message.error("Invalid data");
            },
            (error: any) => {
                message.error("Invalid data");
            }
        )
    };

    if (pageLoad) {
        return <Loader></Loader>;
    }

    return (
        <div className="full-height">
            <div className="full-page padding">
                <Row>
                    <Col span={12}>
                        <div className="sign-in-left">

                            <div className="mb-25">
                                <div className="h1-text">
                                    Sign up in to Micropost
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

export default connect((state: any) => state, { authenticate })(Register);
