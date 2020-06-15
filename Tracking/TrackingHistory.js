import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";

import {DateField} from 'react-admin';
import TrackingError from "./TrackingError";
import LoadingScreen from "./LoadingScreen";

const CourierDetails = ({tracking}) => {
    const classes = useStyles();
    return(
        <div>
            <Container component="main" maxWidth="md" className={classes.TrackingHistory}>
                <Grid container>
                    <Grid item xs={12} >

                        <Typography variant="h4" className={classes.h4}>
                            My Parcel's Journey
                        </Typography>

                        {/*<Typography>*/}
                        {/*    <DateField options={{dateStyle:'long',timeStyle:'medium' }}*/}
                        {/*               record={tracking} source={'updatedAt'} showTime={true}/>*/}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
            </Container>
            <Container component="main" maxWidth="md" className={classes.HistoryDetails}>

                {
                    tracking.checkpoints.length === 0 && <TrackingError/>
                }
                {
                    tracking.checkpoints.map(checkpoint => {
                        return (
                            <Grid container>
                                <Grid item xs={2} md={1}>
                                    <img src={"/images/status/" + checkpoint.tag.code + ".png"} className={classes.StatusIcons} />
                                </Grid>

                                <Grid item xs={10} md={11}>

                                    <Typography className={classes.StatusHeading}>
                                        {checkpoint.message}

                                    </Typography>

                                      <Box display="flex" flexDirection="row">

                                          {
                                              checkpoint.rawTag &&

                                              <Typography className={classes.StatusSubHeading}>
                                                  {checkpoint.rawTag},
                                              </Typography>
                                          }

                                          {
                                              checkpoint.city &&

                                              <Typography className={classes.StatusSubHeading}>
                                                   {checkpoint.city}, 
                                              </Typography>
                                          }
                                          {
                                              checkpoint.state &&

                                              <Typography className={classes.StatusSubHeading}>
                                                  {checkpoint.state},  
                                              </Typography>
                                          }

                                          {
                                              checkpoint.countryIso3 &&

                                              <Typography className={classes.StatusSubHeading}>
                                                  {checkpoint.countryIso3}
                                              </Typography>
                                          }

                                      </Box>

                                    <Typography className={classes.StatusSubHeading}>
                                        <DateField options={{dateStyle:'long',timeStyle:'medium' }}
                                                   record={checkpoint} source={'scanDateTime'} showTime={true}/>
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
