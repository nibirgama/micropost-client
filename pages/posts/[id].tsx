import { useRouter } from "next/router";
import HeaderMenu from '@components/HeaderMenu'
import PostList from '@components/PostList'
import { Button, Col, Drawer, message, Row, Form, Input } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPosts, getPostsComments, getPostsDetails, createComment, makeVote } from "@Redux/actions/Post";
import CommentList from "@components/Comment";
import { checkToken } from "@Api/AuthCheck";

import { wrapper } from "../../Redux";
import { connect } from "react-redux";
import { authenticate, checkServerSideCookie } from "@Redux/actions/authActions";

function useQuery() {
    const router = useRouter();
    const hasQueryParams =
        /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    const ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready) return null;
    return router.query;
}


function PostDetails(props: any) {
    const [queryId, setQueryId]: any = useState(null);
    const [comments, setComments]: any = useState([]);
    const [data, setData] = useState({
        title: "",
        postId: "",
        description: "",
        user: {
            email: "",
            userId: ""
        }
    });

    const query = useQuery();

    useEffect(() => {
        if (!query) {
            return;
        }

        setQueryId(query.id);
        getData(query.id);
        getComments(query.id);

    }, [query]);

    const getData = (id: any) => {

        let data = {
            id: id,
            token: props.token
        }
        getPostsDetails(data,
            (success: any) => {
                setData(success);
            },
            (failed: any) => {
                message.error("Internal server error");
            },
            (error: any) => {
                message.error("Internal server error");
            }
        )
    }

    const getComments = (id: any) => {

        let data = {
            id: id,
            token: props.token
        }
        getPostsComments(data,
            (success: any) => {
                let formatData: any = [];
                success.forEach((comment: any) => {
                    formatData.push({
                        // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                        author: comment.user.email,
                        content: (comment.comment)
                    });
                });

                setComments(formatData);
            },
            (failed: any) => {
                message.error("Internal server error");
            },
            (error: any) => {
                message.error("Internal server error");
            }
        )
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onFinish = (values: any) => {
        let token = props.authentication.authentication.token
        createComment(
            { comment: values.comment, postId: queryId, token: token },
            (success: any) => {
                message.success("New Comment Added");
                getComments(queryId);
            },
            (failed: any) => {
                message.error("Invalid data");
            },
            (error: any) => {
                message.error("Invalid data");
            }
        )
    };

    const handleVote = (vote: any) => {
        console.log(props);

        if (props.authentication.authentication.token == null || props.authentication.authentication.token === undefined) {
            message.error("Please login first");
            return
        }
        makeVote(
            { postId: queryId, voteType: vote, token: props.authentication.authentication.token },
            (success: any) => {
                message.success("Success");
                getComments(queryId);
            },
            (failed: any) => {
                message.error("Invalid data");
            },
            (error: any) => {
                message.error("Invalid data");
            }
        )
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {console.log(props)}
            <HeaderMenu token={props.authentication !== undefined && props.authentication.authentication.token}></HeaderMenu>
            <div className="list-container">
                <Row>
                    <Col offset="2" span="20">
                        <h1>Details</h1>
                        <PostList
                            list={[data]}
                            onLike={() => {
                                // handleVote(1)
                            }}
                            onDislike={() => {
                                // handleVote(0)
                            }}
                        >
                        </PostList>

                        <CommentList comments={comments}></CommentList>
                    </Col>
                </Row>


                {props.authentication !== undefined && props.authentication.authentication.token && (
                    <Row>
                        <Col span="12">
                            <div className="">
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
                                            label="Comment"
                                            name="comment"
                                            rules={[{ required: true, message: 'Please enter some text' }]}
                                        >
                                            <Input.TextArea rows={4} />
                                        </Form.Item>

                                        <Col offset="8">
                                            <Form.Item wrapperCol={{ span: 6 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}


            </div>

        </div>
    )
}


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

export default connect((state: any) => state, { authenticate })(PostDetails);