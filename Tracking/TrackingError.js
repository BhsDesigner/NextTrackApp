import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import ErrorIcon from '@material-ui/icons/Error';

const TrackingError = (props) => {
    const classes = useStyles();
    return(
        <div>
            <Container component="main" maxWidth="md" className={classes.TrackingError}>
                <Grid container>
                    <Grid item>

                        <Typography className={classes.Error}>
                           <ErrorIcon className={classes.Icon} /> Tracking info is not available at the moment. Please check back later.

                        </Typography>
                        
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default TrackingError;
