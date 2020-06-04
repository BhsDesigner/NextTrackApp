import { createMuiTheme } from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";
const Theme = createMuiTheme({

    spacing:4,  // spacing initial value 1 = 4px, 4=16px

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1920,
        },
    },

    typography: {
        fontSize: 14,
        color:"#444444",
        body1: {
            color:"#444444",
            lineHeight:2,
        },
        h1:{
            fontSize:36,
            marginBottom:5,

        },
        h2:{
            fontSize:30,
            marginBottom:5,
        },
        h3:{
            fontSize:26,
            marginBottom:5,
        },
        h4:{
            fontSize:22,
            marginBottom:10,
        },
        h5:{
            fontSize:18,
            marginBottom:5,
        },
        h6:{
            fontSize:16,
            marginBottom:5,
        },
        a:{
            fontSize:16,
        },
    },

    palette:  {
        primary: {
            light:"#666666",
            main: "#F68E4F", // orange
            dark: "#444444", // orange
            contrastText: '#fff',
            black: '#444444',
            danger: '#ED4337',
        },
        secondary: {
            light:"#F68E4F",
            main: '#33C4B3', // sky blue
            dark: "#F68E4F", // orange
            contrastText: '#fff',
        },
        lightcolors:{
            light:"#f2f2f2",
            main:'#f9f9f9',
            dark: "#cccccc", // orange
            contrastText: '#777777',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fcfcfc',
        },
        common: {
            white: '#F5F4F4',
        }
    },
    
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                color: 'white',
            },
        },
    },

});

export default Theme;
