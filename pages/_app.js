import React from 'react';
import App from 'next/app';
import "./App.css"
//import NProgress from 'nprogress';
import SEO from 'constants/next-seo.config';
import { DefaultSeo } from 'next-seo';
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "theme/theme"
import englishMessagesDefault from 'ra-language-english';
import englishMessages from '../translations/en';
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



const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'en') {
        return {...englishMessages, ...englishMessagesDefault};
    }
}, 'en');


class CustomApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

  render() {
    const { Component, pageProps } = this.props;
    return (
        <AdminContext
            dataProvider={ dataProvider }
            authProvider={ authProvider }
            history={history}
            i18nProvider={i18nProvider}
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
