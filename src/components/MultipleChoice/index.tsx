import { Check } from '@mui/icons-material'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material'
interface RowData {
    [key: string]: string | React.ReactNode
}

interface MultipleChoiceProps {
    columns: string[]
    value: number | null
    onChange: (index: number | null) => void
    rows: RowData[]
}

export default function MultipleChoice({ columns, rows, value, onChange }: MultipleChoiceProps) {
    const theme = useTheme()

    const handleRowClick = (rowIndex: number) => {
        onChange(value === rowIndex ? null : rowIndex)
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key={column}
                                align={index === 0 ? 'left' : 'center'}
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                }}
                            >
                                {column}
                            </TableCell>
                        ))}
                        <TableCell align='center' width={75} sx={{ p: 0, m: 0 }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            onClick={() => handleRowClick(rowIndex)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: '15px',
                                '&:last-child td, &:last-child th': { border: 0 },
                                borderBottom:
                                    rowIndex < rows.length - 1 ? `10px solid #E7E8F3` : 'none',
                                backgroundColor:
                                    value === rowIndex ? theme.palette.action.selected : 'inherit',

                                '&:hover .MuiTableCell-root:not(:last-child)': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.secondary.main,
                                },
                            }}
                        >
                            {columns.map((column, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    align={colIndex === 0 ? 'left' : 'center'}
                                    sx={{
                                        backgroundColor: theme.palette.common.white,
                                        borderRadius: colIndex === 0 ? '15px 0px 0px 15px' : '0px',
                                        border: 0,
                                    }}
                                >
                                    {typeof row[column] === 'string' ? (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: row[column] as string,
                                            }}
                                        />
                                    ) : (
                                        row[column]
                                    )}
                                </TableCell>
                            ))}

                            <TableCell align='center' width={75} sx={{ p: 0, m: 0 }}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        backgroundColor:
                                            value === rowIndex
                                                ? theme.palette.primary.main
                                                : theme.palette.secondary.main,
                                        borderRadius: '0px 15px 15px 0px',
                                        color:
                                            value === rowIndex
                                                ? theme.palette.secondary.main
                                                : theme.palette.primary.main,
                                        display: 'flex',
                                        minHeight: '90px',
                                        justifyContent: 'center',
                                        width: '75px',
                                    }}
                                >
                                    <Check />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
