import { InputBase, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
//import { Mask } from 'react-text-mask'

interface InputTextProps {
    label?: string
    placeholder?: string
    type?: string
    //mask?: Mask
}

export default function InputText({ label, placeholder }: InputTextProps) {
    const theme = useTheme()

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
            borderRadius: '15px',
            position: 'relative',
            backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
            border: 0,
            fontSize: 16,
            padding: '0px 20px',
            height: '50px',
        },
    }))

    const inputPlaceholder = placeholder || label

    return (
        <>
            {label && (
                <Typography
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: '13px',
                        fontWeight: 600,
                        marginTop: 2,
                        marginBottom: 1,
                    }}
                >
                    <span style={{ color: theme.palette.warning.main }}>* </span>
                    {label}
                </Typography>
            )}

            <BootstrapInput fullWidth placeholder={inputPlaceholder} />
        </>
    )
}
