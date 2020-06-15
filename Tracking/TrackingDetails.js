import React from "react";
import {useStyles} from "./TrackingDetailStyles";
import CourierDetails from "./CourierDetails";


const TrackingDetails = ({tracking}) => {
     const classes = useStyles();
     return(
             <div>
                 {/*<Container component="main" maxWidth="md" className={classes.DetailsContainer}>
                     <Grid container className={classes.OrderStatusBox}>
                         <Typography variant="h3" className={classes.h3}>Your order is delivered</Typography>
                     </Grid>
                </Container> */}

                <CourierDetails tracking={tracking}/>

             </div>
     )
}
export default TrackingDetails;
