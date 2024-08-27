import {
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography,
    useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        borderRadius: '15px',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: 0,
        fontSize: 16,
        padding: '0px 20px',
        height: '50px',
        lineHeight: '50px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}))

interface InputSelectProps {
    label?: string
    placeholder?: string
    options: string[]
    value?: string
    onChange?: (event: SelectChangeEvent<unknown>) => void
}

export default function InputSelect({
    label,
    placeholder,
    options,
    value,
    onChange,
}: InputSelectProps) {
    const theme = useTheme()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getStyles = (option: string, selectedOption: string, theme: any) => ({
        fontWeight:
            selectedOption === option
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
    })

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

            <CustomSelect
                fullWidth
                value={value || ''}
                onChange={onChange}
                input={<OutlinedInput />}
                displayEmpty
                renderValue={(selected: string) => {
                    if (value === '') {
                        return <>{inputPlaceholder}</>
                    }
                    return selected as string
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 224,
                            width: 250,
                        },
                    },
                }}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value=''>
                    <>{inputPlaceholder}</>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        style={getStyles(option, value || '', theme)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </CustomSelect>
        </>
    )
}
