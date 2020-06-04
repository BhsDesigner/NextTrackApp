import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TrackingHistory from '../Tracking/TrackingHistory'

const CourierDetails = ({tracking}) => {
    const classes = useStyles();
    return(
        <Container component="main" maxWidth="md" className={classes.CourierDetails}>
                <Grid container>
                    <Grid item xs={2} md={1}>
                       
                        <img src={"/images/" + tracking.courier.code + ".png"} className={classes.ImageHeight} />
                    </Grid>

                    <Grid item xs={10} md={11}>

                        <Typography>{tracking.courier.name}</Typography>
                        <Typography >{tracking.number}</Typography>
                    </Grid>
                </Grid>
            
                <TrackingHistory tracking={tracking}/>

            </Container>
    )
}
export default CourierDetails;
