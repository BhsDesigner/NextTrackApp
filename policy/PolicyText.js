import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from 'react-router-dom';
import {useStyles} from "./PolicyStyles";


const FooTer = () => {
    const classes = useStyles();
    return (
        <Container id={'Privacy'} component="main"  maxWidth="lg" padding="0" className={classes.PolicyTextContainer}  >

            <Grid container>
                    <Grid item xs={12} >
                        <Typography variant="h3" className={classes.h3}>
                            Privacy Policy
                        </Typography>

                        <Typography className={classes.mb10}>
                            Smart Parcel Box is owned and run by its parent company Homescapes Europa Ltd. The website,
                            services and products supplied by this brand are done so by Homescapes Europa Ltd.
                        </Typography>
                        <Typography className={classes.mb10}>
                            We at Smartparcelbox are committed to protecting your privacy and take
                            extensive measures to make sure that our customers’ information is kept secure and private.

                        </Typography>
                        <Typography className={classes.mb20}>

                            On this page we explain on how we use customer information and the
                            ways in which we comply with the Data Protection Act 1998 to protect customer privacy.
                        </Typography>
                        <Typography variant="h5" className={classes.h5}>

                            Information we collect about you
                        </Typography>

                        <Typography className={classes.mb10}>

                            When visiting our website we collect certain information about you.
                        </Typography>

                        <Typography className={classes.mb10}>

                            This includes when you purchase our products because we need certain information
                            to process your order. These details may include your name, address, email,
                            delivery address and other contact details such as your telephone number.
                        </Typography>

                        <Typography className={classes.mb10}>

                            When you buy online from us your payment details are taken and collected by our
                            on-line payment provider and these are not available to us.
                            As a result, we do not store or hold any financial details about you when
                            you purchase from us on our website.
                        </Typography>

                        <Typography className={classes.mb20}>

                            We do keep a record of your personal order details such as your contact
                            details and order details so that we can deal with queries and problems
                            that may arise with an order in future,
                            so we can quickly deal with and solve any potential problems or queries you may have.
                        </Typography>

                        <Typography variant="h5" className={classes.h5}>

                            Information we collect about you
                        </Typography>

                        <Typography className={classes.mb10}>

                            When visiting our website we collect certain information about you.
                        </Typography>

                        <Typography className={classes.mb10}>

                            This includes when you purchase our products because we need certain information
                            to process your order. These details may include your name, address, email,
                            delivery address and other contact details such as your telephone number.
                        </Typography>

                        <Typography className={classes.mb10}>

                            When you buy online from us your payment details are taken and collected by our
                            on-line payment provider and these are not available to us.
                            As a result, we do not store or hold any financial details about you when
                            you purchase from us on our website.
                        </Typography>

                        <Typography className={classes.mb20}>

                            We do keep a record of your personal order details such as your contact
                            details and order details so that we can deal with queries and problems
                            that may arise with an order in future,
                            so we can quickly deal with and solve any potential problems or queries you may have.
                        </Typography>
                    </Grid>

                </Grid>

        </Container>
    )
}
export default FooTer;