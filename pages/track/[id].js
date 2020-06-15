import React from 'react'
import Layout from "components/Layout";
import Container from "@material-ui/core/Container";
import {useStyles} from "Tracking/TrackingStyles"
import {TrackYourShipment} from "../../components/TrackYourShipmentBlock";
import {NeedHelpBLock} from "../../Tracking/NeedHelpBlock";

const Page = (props) => {
    const classes = useStyles();

    return (
        <Layout>
            <Container component="main" maxWidth="md" className={classes.TrackingContainer}>
                <TrackYourShipment {...props}/>
                <NeedHelpBLock/>
            </Container>
        </Layout>
    )
}


Page.getInitialProps = async function(context) {
    const { id } = context.query;
    return { id };
};

export default Page;
