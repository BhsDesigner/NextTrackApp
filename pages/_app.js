import React from 'react';
import App from 'next/app';
import "./App.css"
//import NProgress from 'nprogress';
import SEO from 'constants/next-seo.config';
import { DefaultSeo } from 'next-seo';
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "theme/theme"
import englishMessagesDefault from 'ra-language-english';
import * as Messages from '../translations';
import {createWrapper} from 'next-redux-wrapper';
import {history} from "../redux/store";
import { makeStore } from '../redux/store';
import {AdminContext } from 'react-admin';
import {authProvider} from "../security/authProvider";
import {dataProvider} from "../dataProvider/dataProvider";
import polyglotI18nProvider from 'ra-i18n-polyglot';

// Router.events.on('routeChangeStart', url => {
//     NProgress.start();
// });
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());



const i18nProvider = (host) => {
    const mapping = {
        'tracking.homescapesonline.com': 'en',
        'tracking.homescapesonline.de': 'de',
        'tracking.homescapes.fr': 'fr',
    }
    return polyglotI18nProvider(locale => {
        return {...Messages[locale], ...englishMessagesDefault};
    }, mapping[host] ?? 'en');
}

class CustomApp extends App {
    static host;

    static async getInitialProps({ Component, ctx }) {
        if(ctx.req) {
            CustomApp.host = ctx.req.headers.host;
        }
        else {
            CustomApp.host = window.location.hostname;
        }
        let pageProps = {};
        if (Component.getInitialProps) {
            let compAsyncProps = await Component.getInitialProps(ctx);
            pageProps = { ...pageProps, ...compAsyncProps };
        }
        return { pageProps };
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

  render() {
        if(!CustomApp.host && window) CustomApp.host = window.location.hostname;
        const { Component, pageProps } = this.props;
        return (
            <AdminContext
                dataProvider={ dataProvider(CustomApp.host) }
                authProvider={ authProvider }
                history={history}
                i18nProvider={i18nProvider(CustomApp.host)}
            >
                <ThemeProvider theme={theme}>
                    <DefaultSeo {...SEO} />
                    <Component {...pageProps}/>
                </ThemeProvider>
            </AdminContext>

        );
  }
}

export const wrapper = createWrapper(makeStore, {debug: false});
export default wrapper.withRedux(CustomApp);
