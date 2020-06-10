import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
    HeaderContainer: {
        padding:theme.spacing(4, 0),
        textAlign:'center',
        backgroundColor:theme.palette.lightcolors.main,
    },
    AppLogo:{
        width:'100%',
    },
}));

const TopMenu = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xl" padding="0" className={classes.HeaderContainer} >
            <Grid container maxWidth="lg">
                <Grid item className={classes.AppLogo}>
                    <Link href="/" as="/">
                        <img src={'/images/Logo.jpg'}  />
                    </Link>

                </Grid>
            </Grid>
        </Container>
    )
}
export default TopMenu;
