import { Box, useTheme } from '@mui/material'

interface ContextDataProps {
    declarante?: string
    celular?: string
    falecido?: string
    preOrdemServico?: string
    servico?: string
    horario?: string
}

export default function ContextData({
    declarante,
    celular,
    falecido,
    preOrdemServico,
    servico,
    horario,
}: ContextDataProps) {
    const theme = useTheme()
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'flex-end' }}>
            {declarante && (
                <Box>
                    Declarante:{' '}
                    <span style={{ color: theme.palette.primary.main }}>{declarante}</span>
                </Box>
            )}
            {celular && (
                <Box>
                    Celular: <span style={{ color: theme.palette.primary.main }}>{celular}</span>
                </Box>
            )}
            {falecido && (
                <Box>
                    Falecido: <span style={{ color: theme.palette.primary.main }}>{falecido}</span>
                </Box>
            )}
            {preOrdemServico && (
                <Box>
                    Pré Ordem de Serviço:{' '}
                    <span style={{ color: theme.palette.primary.main }}>{preOrdemServico}</span>
                </Box>
            )}
            {servico && (
                <Box>
                    Serviço: <span style={{ color: theme.palette.primary.main }}>{servico}</span>
                </Box>
            )}
            {horario && (
                <Box>
                    Horário: <span style={{ color: theme.palette.primary.main }}>{horario}</span>
                </Box>
            )}
        </Box>
    )
}
