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
                    My tracking number isn’t working
                </Typography>
                <Typography className={classes.mb10}>
                    If you have entered your tracking number buy can’t see any details, it may be because your order is still on its way to the depot.
                    We advise you wait a few hours before trying to track your order again.

                </Typography>


            </Grid>
            
            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    Furniture Deliveries
                </Typography>
                <Typography className={classes.mb10}>
                    Please note that furniture and bulky items are not delivered by our standard courier network and cannot be tracked here.
                    Please contact our customer support for help regarding your furniture orders.

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
                    <a href="tel:0121 3680051" className={classes.Link}> <PhoneIcon className={classes.Icons} /> Call us at: 0121 3680051</a>

                </Typography>
                <Typography className={classes.mb10}>

                    <a href="mailto:support@homescapesonline.com" className={classes.Link}><EmailIcon className={classes.Icons} /> support@homescapesonline.com</a>

                </Typography>
            </Grid>
        </>
    )
}
