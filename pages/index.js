import React from 'react'
import Layout from "../components/Layout";
import Container from "@material-ui/core/Container";
import {useStyles} from "Tracking/TrackingStyles"
import {TrackYourShipment} from "../components/TrackYourShipmentBlock";
import {NeedHelpBLock} from "../components/NeedHelpBlock";

const Index = (props) => {
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
export default Index;
