import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import {useStyles} from "../Tracking/TrackingStyles";

export const NeedHelpBLock = () => {
    const classes = useStyles();
    return (
        <>
            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    Tracking Number?
                </Typography>
                <Typography className={classes.mb10}>
                    You should have received an email from Homescapes with the shipment
                    tracking number upon the dispatch of your order. Please use it to track your order.

                </Typography>


            </Grid>
            
            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    Furniture Deliveries
                </Typography>
                <Typography className={classes.mb10}>
                    Please note the bulky items like furniture are not delivered by courier network and cannot be
                    tracked here. Please contact our customer support for help regarding your furniture orders.

                </Typography>


            </Grid>

            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    Need Help?
                </Typography>
                <Typography className={classes.mb10}>
                    We're here Monday-Friday 9:00 AM - 5:00 PM
                </Typography>

                <Typography className={classes.mb10}>
                    <PhoneIcon className={classes.Icons} /> Call us at: 0121 3680051
                </Typography>
                <Typography className={classes.mb10}>
                    <EmailIcon className={classes.Icons} /> Email - support@homescapesonline.com
                </Typography>
            </Grid>
        </>
    )
}
