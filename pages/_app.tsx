import type { AppProps } from 'next/app'
import "../styles/globals.less";
import { wrapper } from "../Redux";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";


NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done()
});

Router.events.on("routeChangeError", () => {
  NProgress.done()
});

// Router.onRouteChangeComplete = () => NProgress.done();

// Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
// export default MyApp
export default wrapper.withRedux(MyApp);
