import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({

    PolicyTextContainer:{
      marginTop:30,
    },

    mb10:{
        marginBottom:theme.spacing(2.5),
    },
    mb20:{
        marginBottom:theme.spacing(5),
    },
    h3:{
        marginBottom:theme.spacing(2.5),
    },
    h5:{
        marginBottom:theme.spacing(2.5),
    },
}));