import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import TrackingNumber from "../Tracking/TrackingNumber";
import React, {useEffect} from "react";
import {useStyles} from "../Tracking/TrackingStyles";
import {useMutation} from "react-admin";
import {Tracking} from "../dataProvider/client/Tracking";
import TrackingDetails from "../pages/TrackingDetails";
import TrackingNotFound from "../Tracking/TrackingNotFound";
import ConnectionError from "../Tracking/ConnectionError";
import LoadingScreen from "../Tracking/LoadingScreen";

export const TrackYourShipment = ({id}) => {
    const classes = useStyles();
    const [mutate, { data: trackings, total, error, loading, loaded }]  = useMutation()
    useEffect(() => {
        if(id) mutate(Tracking.getInstance().trackOrderQuery({filter: {number: id}}));
    }, [id])

    return (
        <>
            <Grid item  className={classes.GridItem}>
                <Typography variant="h3" className={clsx(classes.h3, classes.mb10)}>
                    Track Your Order
                </Typography>
                <Typography className={classes.mb10}>
                    Thank you for shopping with Homescapes.

                </Typography>


                <Typography className={classes.mb10}>
                    Once your order has been dispatched you will receive a shipment confirmation email containing your tracking information.

                </Typography>


                <Typography>
                    Please enter your full tracking number in the box below.

                </Typography>


            </Grid>

            <Grid item  className={classes.TrackingInputBox}>
                <TrackingNumber mutate={mutate}/>
            </Grid>
            {
                error && <ConnectionError/>
            }
            {
                loading && <LoadingScreen/>
            }
            {
                total === 0  && <TrackingNotFound/>
            }
            {
                total > 0 && !loading && trackings && trackings.map(tracking => {
                    return (
                        <Grid item  className={classes.DetailsBox}>
                            <TrackingDetails tracking={tracking}/>
                        </Grid>
                    )
                })
            }
        </>
    )
}