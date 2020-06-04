import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
    DateField
} from 'react-admin';

const CourierDetails = ({tracking}) => {
    const classes = useStyles();
    console.log(tracking)
    return(
        <div>
            <Container component="main" maxWidth="md" className={classes.TrackingHistory}>
                <Grid container>
                    <Grid item xs={6} md={12}>

                        <Typography variant="h4" className={classes.h4}>
                            My Parcel's Journey
                        </Typography>

                        <Typography>
                            <DateField options={{dateStyle:'long',timeStyle:'medium' }}
                                       record={tracking} source={'updatedAt'} showTime={true}/>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container component="main" maxWidth="md" className={classes.HistoryDetails}>
                {
                    tracking.checkpoints.map(checkpoint => {
                        return (
                            <Grid container>
                                <Grid item xs={2} md={1}>
                                    <img src={"/images/" + checkpoint.status.code + ".png"} className={classes.StatusIcons} />
                                </Grid>

                                <Grid item xs={10} md={11}>

                                    <Typography className={classes.StatusHeading}>
                                        {checkpoint.message}

                                    </Typography>

                                    <Typography className={classes.StatusSubHeading}>
                                        United Kingdom
                                    </Typography>
                                    <Typography className={classes.StatusSubHeading}>
                                        <DateField options={{dateStyle:'long',timeStyle:'medium' }}
                                                   record={checkpoint} source={'createdAt'} showTime={true}/>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    })
                }

                
            </Container>
        </div>
    )
}
export default CourierDetails;
