import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import ErrorIcon from '@material-ui/icons/Error';

const LoadingScreen = (props) => {
    const classes = useStyles();
    return(
        <>
            <Container component="main" maxWidth="md" className={classes.loadingScreen}>

                <img src={'/images/loading.gif'} className={classes.LoadingIcon} />

            </Container>
        </>
    )
}
export default LoadingScreen;
