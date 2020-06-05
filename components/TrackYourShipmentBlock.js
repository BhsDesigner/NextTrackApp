import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import TrackingNumber from "../Tracking/TrackingNumber";
import React, {useEffect} from "react";
import {useStyles} from "../Tracking/TrackingStyles";
import {useMutation} from "react-admin";
import {Tracking} from "../dataProvider/client/Tracking";
import TrackingDetails from "../pages/TrackingDetails";
import TrackingError from "../Tracking/TrackingError";
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
                <Typography>
                    You should have received an email from Homescapes with the shipment tracking number upon the dispatch of your order. Please use it to track your order.

                </Typography>


            </Grid>

            <Grid item  className={classes.TrackingInputBox}>
                <TrackingNumber mutate={mutate}/>
            </Grid>
            {
                error && <div>error</div>
            }
            {
                loading && <LoadingScreen/>
            }
            {
                total ===0  && <TrackingError/>
            }
            {
                !loading && trackings && trackings.map(tracking => {
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
