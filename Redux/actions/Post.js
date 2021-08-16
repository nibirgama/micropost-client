import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { AUTHENTICATE, DEAUTHENTICATE } from "../types";
import jwt from "jsonwebtoken";
import { constructData } from "../../helpers/Functions";


//SERVICES
import Post from "../../Api/Posts";

export const getPosts = (success, fail, errorLoad) => {
    // let obj = constructData(data);

    Post.getPosts()
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};

export const getPostsDetails = (data, success, fail, errorLoad) => {

    let obj = constructData(data);

    Post.getPostsDetails(obj, data.token)
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};

export const getPostsComments = (data, success, fail, errorLoad) => {

    let obj = constructData(data);

    Post.getPostsComments(obj, data.token)
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};

export const createPost = (data, success, fail, errorLoad) => {

    let obj = constructData(data);

    Post.createPost(obj, data.token)
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};

export const createComment = (data, success, fail, errorLoad) => {

    let obj = constructData(data);

    Post.createComment(obj, data.token)
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};


export const makeVote = (data, success, fail, errorLoad) => {

    let obj = constructData(data);
    console.log(data.token);
    Post.makeVote(obj, data.token)
        .then((response) => {
            if (response.status == 201 || response.status == 200) {
                success(response.data);
            }
        })
        .catch((err) => {
            console.log(err);
            errorLoad(err.response.data);
        });
};



// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
    return (dispatch) => {
        dispatch({ type: AUTHENTICATE, payload: token });
    };
};

// removing the token
export const deauthenticate = () => {
    return (dispatch) => {
        removeCookie("token");
        Router.push("/dashboard");
        dispatch({ type: DEAUTHENTICATE });
    };
};

export const checkServerSideCookie = (ctx) => {
    const token = getCookie("token", ctx.req);
    if (token) {
        ctx.store.dispatch(reauthenticate(token));
    }
};
/**
 * cookie helper methods
 */

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: "/",
        });
    }
};

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1,
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser
        ? getCookieFromBrowser(key)
        : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};
