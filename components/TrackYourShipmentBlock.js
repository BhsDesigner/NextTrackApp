import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import TrackingNumber from "../Tracking/TrackingNumber";
import React, {useEffect} from "react";
import {useStyles} from "../Tracking/TrackingStyles";
import {useTranslate, useMutation} from "react-admin";
import {Tracking} from "../dataProvider/client/Tracking";
import TrackingDetails from "../Tracking/TrackingDetails";
import TrackingNotFound from "../Tracking/TrackingNotFound";
import ConnectionError from "../Tracking/ConnectionError";
import LoadingScreen from "../Tracking/LoadingScreen";


export const TrackYourShipment = ({id}) => {
    const classes = useStyles();
    const translate = useTranslate();

    const [mutate, { data: trackings, total, error, loading, loaded }]  = useMutation()
    useEffect(() => {
        if(id) mutate(Tracking.getInstance().trackOrderQuery({filter: {number: id}}));
    }, [id])

    return (
        <>
            <Grid item  className={classes.GridItem}>
                <Typography variant="h3" className={clsx(classes.h3, classes.mb10)}>
                    {translate('homescapes.tracking.track_your_order')}
                </Typography>
                <Typography className={classes.mb10}>
                    {translate('homescapes.tracking.thank_you')}

                </Typography>


                <Typography className={classes.mb10}>
                    {translate('homescapes.tracking.once_your_order')}

                </Typography>


                <Typography>
                    {translate('homescapes.tracking.please_enter_your')}

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