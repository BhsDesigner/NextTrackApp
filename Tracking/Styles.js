import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop:'24px',
        marginBottom:'24px',

    },
    TrackingInput:{
        width: '100%',
        color:theme.palette.secondary.main,
        borderWidth:2,
    },
    submit: {
        margin:theme.spacing(0, 0, 2),
        height: 56,
        borderWidth:2,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.main,
            borderWidth:2,
            color: theme.palette.primary.main,
        },
    },
    Icons:{
        marginRight:5,
    },

}));
