import { Typography, useTheme, Autocomplete, TextField } from '@mui/material'

interface InputAutocompleteProps {
    label?: string
    placeholder?: string
    options: string[]
    value?: string
    disabled?: boolean
    onChange?: (val: string | null) => void
}

export default function InputAutocomplete({
    label,
    placeholder,
    options,
    value,
    onChange = () => {},
    disabled,
}: InputAutocompleteProps) {
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
                    <span style={{ color: theme.palette.warning.main }}>* </span>
                    {label}
                </Typography>
            )}

            <Autocomplete
                disablePortal
                value={value}
                disabled={disabled}
                onChange={(_, val) => {
                    onChange(val)
                }}
                sx={{
                    borderRadius: '15px',
                    position: 'relative',
                    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                    border: 0,
                    fontSize: 16,
                    padding: '0px 5px',
                    '& input': {
                        height: '100%',
                    },
                    height: '50px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
                aria-label='Without label'
                options={options}
                renderInput={(params) => <TextField {...params} placeholder={inputPlaceholder} />}
            />
        </>
    )
}
