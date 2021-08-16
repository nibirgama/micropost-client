import axios from "axios";
import { BASEURL } from "../Config/Config";

export async function checkToken(token) {
  const response = await axios.get(`${BASEURL}/user/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  });

  return response;
}

export async function checkAuth(token) {
  const response = await axios.get(`${BASEURL}/`, {
    headers: {
      authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  });

  return response;
}

export async function joinCheck(token) {
  const response = await axios.get(
    `${BASEURL}/projects/invite/join/status/${token}`,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );

  return response;
}

export async function join(token, urlToken) {
  const response = await axios.post(
    `${BASEURL}/projects/invite/join/${urlToken}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );

  return response;
}

export async function joinViaLink(token, urlToken) {
  const response = await axios.post(
    `${BASEURL}/projects/link-invite/join/${urlToken}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );

  return response;
}
