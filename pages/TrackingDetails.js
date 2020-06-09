import React from "react";
import {useStyles} from "Tracking/TrackingDetailStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CourierDetails from "../Tracking/CourierDetails";


const TrackingDetails = ({tracking}) => {
     const classes = useStyles();
     return(
             <div>
             <Container component="main" maxWidth="md" className={classes.DetailsContainer}>
                 <Grid container className={classes.OrderStatusBox}>
                     <Typography variant="h3" className={classes.h3}>Your order is delivered</Typography>
                 </Grid>
             </Container>

             
             <CourierDetails tracking={tracking}/>
             
             </div>
     )
}
export default TrackingDetails;
