import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles(theme => ({
    TrackingContainer: {
        padding:theme.spacing(10),

        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(7, 2.5),
        },
    },
    TrackingInputBox:{
        paddingTop:theme.spacing(5),
    },
    Link: {
        color:theme.palette.secondary.main,
    },
    DetailsBox:{
        textAlign:'left',
        padding:theme.spacing(0, 3),
    },
    GridItem:{
        padding:theme.spacing(2, 3),
    },

    h3:{
        color:theme.palette.lightcolors.contrastText,
        letterSpacing:1
    },
    h5:{
        color:theme.palette.lightcolors.contrastText,
    },
    mb10:{
        marginBottom: theme.spacing(2.5),
    },
    Icons:{
        marginBottom:-6,
        marginRight:5,
    },

}));