import React from 'react'
import Header from "../header/Header";
import FooTer from "../footer/Footer";
import ScrollToTopOnMount from './ScrollTop';

const Layout = (props) => {
    return (
        <div>
            <ScrollToTopOnMount /><ScrollToTopOnMount />
            <Header/>
                {props.children}
            <FooTer/>
        </div>
    )
}
export default Layout;
