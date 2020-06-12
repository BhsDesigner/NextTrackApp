import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from '@material-ui/icons/Error';
import {useTranslate} from "react-admin";

const ConnectionError = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    return(
        <div>
            <Container component="main" maxWidth="md" className={classes.TrackingError}>
                <Grid container>
                    <Grid item>

                        <Typography className={classes.Error}>
                            <ErrorIcon className={classes.Icon} /> {translate('homescapes.error.tracking_not_found')}

                        </Typography>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default ConnectionError;
