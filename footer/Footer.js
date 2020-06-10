import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useStyles} from "./FooterStyles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import {useTranslate} from "react-admin";

const FooTer = () => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <Container component="main" maxWidth="xl" padding="0" className={classes.FooterContainer} >

            <Container maxWidth="md" className={classes.FooterGrid} >
                <Grid container>


                    <Grid item xs={12} sm={3} >
                        <Typography className={classes.iconsalign} >
                            <Link href="//twitter.com/HomescapesUK">
                                <a target={"_blank"}><TwitterIcon/> </a>
                            </Link>
                            <Link href="//www.facebook.com/HomescapesEuropaLtd">
                                <a target={"_blank"}><FacebookIcon/></a>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} >
                        <Typography className={classes.linksalign} >
                            <Link href="//www.homescapesonline.com/contact">
                                <a target={"_blank"}> {translate('homescapes.links.contact_us')} </a>
                            </Link>
                            <Link href="//www.homescapesonline.com/terms-and-condtions">
                                <a target={"_blank"} className={classes.Link}> {translate('homescapes.links.terms_condition')} </a>
                            </Link>
                            <Link href="//www.homescapesonline.com/info/website-privacy-and-cookies">
                                <a target={"_blank"} className={classes.Link}> {translate('homescapes.links.privacy_policy')} </a>
                            </Link>
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Container>
    )
}
export default FooTer;
