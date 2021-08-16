import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import { AUTHENTICATE, DEAUTHENTICATE } from "../types";
import jwt from "jsonwebtoken";

//SERVICES
import Authentication from "@Api/Authentication";
import { constructData } from "@helpers/Functions";

//Sign up user
export const authenticate = (data, success, fail, errorLoad) => (dispatch) => {
  // console.log(data);
  // return
  let obj = {
    email: data.email,
    password: data.password,
    grant_type: "password"
  };

  Authentication.login(obj, data.token)
    .then((response) => {
      if (response.status == 201 || response.status == 200) {
        let token = response.data.accessToken;
        setCookie("token", token);
        dispatch({ type: AUTHENTICATE, payload: token });
        success(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
      errorLoad(err.response.data);
    });
};



export const signUp = (data, success, fail, errorLoad) => {

  let obj = constructData(data);

  Authentication.signUp(obj, data.token)
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
    Router.push("/");
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

export const contactUs = (data, success, fail, errorLoad, email = true) => {
  Authentication.contactUs(data)
    .then((response) => {
      if (response.status == 201 || response.status == 200) {
        success(response.data);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      errorLoad(err.response.data);
    });
};

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
