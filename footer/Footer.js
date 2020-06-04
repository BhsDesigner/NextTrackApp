import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "./FooterStyles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

const FooTer = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xl" padding="0" className={classes.FooterContainer} >

            <Container maxWidth="md" className={classes.FooterGrid} >
                <Grid container>


                    <Grid item xs={12} md={6}>
                        <Typography align={"left"}>
                            <Link href="//twitter.com/HomescapesUK">
                                <a><TwitterIcon/> </a>
                            </Link>
                            <Link href="//www.facebook.com/HomescapesEuropaLtd">
                                <a><FacebookIcon/></a>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography align={"right"}>
                            <Link href="//www.homescapesonline.com/contact">
                                <a>Contact Us</a>
                            </Link>
                            <Link href="//www.homescapesonline.com/info/website-privacy-and-cookies">
                                <a className={classes.Link}>Privacy policy</a>
                            </Link>
                            <Link href="//www.homescapesonline.com/terms-and-condtions">
                                <a className={classes.Link}>Terms & Conditions</a>
                            </Link>
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Container>
    )
}
export default FooTer;
