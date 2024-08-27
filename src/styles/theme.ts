import { createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        background: {
            default: '#E7E8F3',
        },
        primary: {
            main: '#11289C',
            dark: '#111979',
        },
        secondary: {
            main: '#F2BA6F',
        },
        warning: {
            main: '#E74343',
        },
    },
    typography: {
        fontFamily: [
            "'Open Sans Variable', sans-serif",
            "'Poppins', sans-serif",
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    paddingBottom: '70px',
                },
            },
        },
    },
})

export default theme
