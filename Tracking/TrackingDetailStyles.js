import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles(theme => ({
    DetailsContainer: {
        padding:theme.spacing(5, 0, 3, 0),
        lineHeight:theme.spacing(0.7),

        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(4, 0),
        },
    },
    OrderStatusBox:{
        backgroundColor: theme.palette.secondary.main,
        padding:theme.spacing(5),
    },
    OrderDetails: {
        backgroundColor: theme.palette.lightcolors.main,
        padding:theme.spacing(5),
    },
    TrackingHistory: {
        backgroundColor: theme.palette.lightcolors.main,
        padding:theme.spacing(5),
        marginTop:theme.spacing(5),
    },
    TrackingError:{
        marginBottom:theme.spacing(10),
        textAlign:'left',
    },
    Error:{
        color:theme.palette.primary.danger,
    },
    HistoryDetails:{
        padding:theme.spacing(5),
        borderWidth:1,
        borderColor: theme.palette.lightcolors.light,
        border:"solid",
    },
    StatusHeading:{
        fontSize:18,
        color:theme.palette.primary.black,
    },
    StatusSubHeading:{
        fontSize:14,
        color:theme.palette.primary.light,
    },
    historyIcons:{
        marginBottom:'-18px',
    },
    CourierDetails: {
        padding:theme.spacing(5, 0, 15, 0),
    },
    Link: {
        color:theme.palette.secondary.main,
    },
    GridItem:{
        padding:theme.spacing(2, 3),
    },

    h3:{
        color:theme.palette.primary.contrastText,
        letterSpacing:.5,
    },
    h4:{
        color:theme.typography.color,
        letterSpacing:.5,
    },
    h5:{
        color:theme.palette.lightcolors.contrastText,
    },
    mb10:{
        marginBottom: theme.spacing(2.5),
    },
    StatusIcons:{
        marginTop:10,
        maxHeight:40,
    },
    Icon:{
        marginBottom:-6,
    },
    ImageHeight:{
        height:'auto',
        maxWidth:65,
    }

}));