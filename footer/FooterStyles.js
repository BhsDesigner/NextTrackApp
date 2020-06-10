import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({

    FooterContainer: {
        background:theme.palette.lightcolors.main,
        bottom:'0',
        zIndex:9,
    },
    FooterGrid: {
        padding:theme.spacing(10, 12),
    },
    Link:{
        marginLeft: theme.spacing(4),
    },
    iconsalign:{
        textAlign:'left',

        [theme.breakpoints.down('xs')]: {
            textAlign:'center',
        },
    },
    linksalign:{
        textAlign:'right',
        [theme.breakpoints.down('xs')]: {
            textAlign:'center',
        },
    },

}));