import React from "react";
import Head from "next/head";
import { Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const AppLayout =  ({ children }: any) => {
    return (
      <React.Fragment>
        <Head>
          <title>LinkedInMate</title>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
        </Head>

        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <Content>{children}</Content>

      </React.Fragment>
    );
}

export default AppLayout;