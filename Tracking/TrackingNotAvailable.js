import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import ErrorIcon from '@material-ui/icons/Error';
import {useTranslate} from "react-admin";

const TrackingError = ({tracking}) => {
    const classes = useStyles();
    const translate = useTranslate();
    return(
        <div>
            <Container component="main" maxWidth="md" className={classes.TrackingError}>
                <Grid container>
                    <Grid item>

                        <Typography className={classes.Error}>

                            <ErrorIcon className={classes.Icon} /> {translate('homescapes.error.tracking_not_avilable')}
                            <a target={"_blank"} href={tracking.trackingUrl} className={classes.Link}>
                                {translate('homescapes.error.tracking_on_courier_website')}
                            </a>
                        </Typography>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default TrackingError;
