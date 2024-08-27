import { InputBase, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import MaskedInput, { Mask } from 'react-text-mask'

interface InputTextProps {
    label?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: string
    mask?: Mask
    notRequired?: boolean
    multiline?: boolean
    rows?: number
}

const BootstrapInput = styled(InputBase)(({ theme, rows }) => ({
    '& .MuiInputBase-input': {
        borderRadius: '15px',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: 0,
        fontSize: 16,
        padding: '0px 20px',
        height: '50px',
    },

    '& textarea.MuiInputBase-input': {
        ...(!!rows ? {} : { height: '250px !important' }),
        padding: '10px 20px',
    },
}))

export default function InputText({
    label,
    placeholder,
    type,
    mask,
    multiline,
    value,
    onChange,
    notRequired,
    rows,
}: InputTextProps) {
    const theme = useTheme()

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
                    {!notRequired && <span style={{ color: theme.palette.warning.main }}>* </span>}
                    {label}
                </Typography>
            )}

            {mask ? (
                <MaskedInput
                    mask={mask}
                    value={value}
                    onChange={onChange}
                    render={(ref, props) => (
                        <BootstrapInput
                            type={type}
                            fullWidth
                            placeholder={inputPlaceholder}
                            inputRef={ref}
                            {...props}
                        />
                    )}
                />
            ) : (
                <BootstrapInput
                    type={type}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder={multiline ? '' : inputPlaceholder}
                    multiline={multiline}
                    rows={rows}
                />
            )}
        </>
    )
}
