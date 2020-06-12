import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import {useStyles} from "../Tracking/TrackingStyles";
import {useTranslate} from "react-admin";
import {getDomainPage, getDomainVariable} from "../constants/pagesMapping";

export const NeedHelpBLock = () => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <>
            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    {translate('homescapes.needhelp.mytracking')}
                </Typography>
                <Typography className={classes.mb10}>
                    {translate('homescapes.needhelp.mytracking_message')}

                </Typography>


            </Grid>
            
            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    {translate('homescapes.needhelp.furniture_delivery')}
                </Typography>
                <Typography className={classes.mb10}>
                    {translate('homescapes.needhelp.furniture_delivery_message')}

                </Typography>


            </Grid>

            <Grid item  className={classes.GridItem}>
                <Typography variant="h5" className={clsx(classes.h5, classes.mb10)}>
                    {translate('homescapes.needhelp.help_heading')}
                </Typography>
                <Typography className={classes.mb10}>
                    {translate('homescapes.needhelp.help_timing')}
                </Typography>

                <Typography className={classes.mb10}>
                    <a href={`tel:${getDomainVariable('help_number')}`} className={classes.Link}>
                        <PhoneIcon className={classes.Icons} /> {translate('homescapes.needhelp.help_number')}
                    </a>

                </Typography>
                <Typography className={classes.mb10}>

                    <a href={`mailto:${getDomainVariable('support_mail')}`} className={classes.Link}>
                        <EmailIcon className={classes.Icons} /> {translate('homescapes.needhelp.support_mail')}
                    </a>

                </Typography>
            </Grid>
        </>
    )
}
