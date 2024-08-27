import { Box, Container, Grid, List, ListItem, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'

import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import InputText from '../../components/InputText'

export default function Orietacoes() {
    const theme = useTheme()
    const { form, handleFormChange } = useDeclarationStore()
    console.log(form)
    const navigate = useNavigate()

    const handleNext = () => {
        navigate(RouterPath.MENSAGENS_HOSPITAL)
    }
    const handleBack = () => {
        navigate(RouterPath.DIRECIONAMENTO_UNIDADE)
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Orientações Finais' />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ContextData
                            declarante={form.declarantName}
                            celular={form.declarantFirstPhone}
                            falecido={form.deceasedPersonName}
                            preOrdemServico={form.funeralType}
                            servico={form.burialPlan}
                            horario={new Date().toLocaleTimeString()}
                        />
                    </Grid>
                </Grid>

                {form.deceasedPersonLocation === 'Hospital, UPA ou Posto de Saúde' ? (
                    <Question
                        number={1}
                        text={
                            'Antes de finalizar seu atendimento, vou confirmar algumas informações importantes:'
                        }
                    >
                        <Box
                            sx={{
                                borderRadius: '15px',
                                position: 'relative',
                                backgroundColor:
                                    theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                                border: 0,
                                fontSize: 16,
                                padding: '40px',
                            }}
                        >
                            {[
                                'Hospital das Clínicas (HC)',
                                'Hospital Municipal São Judas Tadeu',
                            ].includes(form?.hospitalName || '') && (
                                <Box>
                                    <Typography
                                        color={'#111979'}
                                        fontSize={'20px'}
                                        fontWeight={'bold'}
                                        lineHeight={'34px'}
                                    >
                                        HOSPITAL:
                                    </Typography>
                                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                        <ListItem
                                            sx={{
                                                display: 'list-item',
                                                mb: 1,
                                                p: 0,
                                                color: '#5C5C5C',
                                            }}
                                        >
                                            {form.hospitalName === 'Hospital das Clínicas (HC)' && (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: `Como informei no atendimento, no <strong>Hospital das Clínicas</strong> as remoções só são permitidas de <strong>8h às 18h</strong> e é preciso ter uma <strong>pessoa responsável</strong> com a <strong>Declaração de Óbito original</strong> no local.`,
                                                    }}
                                                />
                                            )}
                                            {form.hospitalName ===
                                                'Hospital Municipal São Judas Tadeu' && (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: `Como informei no atendimento, no <strong>Hospital São Judas Tadeu</strong> as remoções só são permitidas com <strong>acompanhamento de um familiar</strong>.`,
                                                    }}
                                                />
                                            )}
                                        </ListItem>
                                    </List>
                                </Box>
                            )}
                            <Box>
                                <Typography
                                    color={'#111979'}
                                    fontSize={'20px'}
                                    fontWeight={'bold'}
                                    lineHeight={'34px'}
                                >
                                    UNIDADE:
                                </Typography>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `O(A) Sr(a). optou pela Unidade <strong>${form.businessUnitTitle?.split('-')?.[0]}</strong> para dar continuidade em seu atendimento. O endereço da unidade é <strong>${form.businessUnitTitle?.split('-').slice(1, -1).join('-')}</strong>`,
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `O(A) Sr(a). vai precisar levar a <strong>Declaração de Óbito original, o documento do falecido, o documento da pessoa responsável</strong>.`,
                                            }}
                                        />
                                    </ListItem>

                                    {form.deceasedPersonHaveClothes === 'Sim' || form.companyClothesForFuneral === "Não" ? (
                                        <ListItem
                                            sx={{
                                                display: 'list-item',
                                                mb: 1,
                                                p: 0,
                                                color: '#5C5C5C',
                                            }}
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: `O(A) Sr(A) também vai precisar <strong>levar para a unidade as roupas</strong> que serão usadas para o velório`,
                                                }}
                                            />
                                        </ListItem>
                                    ) : null}
                                </List>
                            </Box>
                        </Box>
                    </Question>
                ) : null}

                {form.deceasedPersonLocation === 'Residência' ? (
                    <Question
                        number={1}
                        text={
                            'Antes de finalizar seu atendimento, vou confirmar algumas informações importantes:'
                        }
                    >
                        <Box
                            sx={{
                                borderRadius: '15px',
                                position: 'relative',
                                backgroundColor:
                                    theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                                border: 0,
                                fontSize: 16,
                                padding: '40px',
                            }}
                        >
                            <Box>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `Um agente funerário da <strong>${form.businessUnitTitle?.split('-')?.[0]}</strong> vai entrar em contato por <strong> WhatsApp </strong>  para que o(a) Sr(a) envie uma foto da <strong> Declaração de Óbito </strong>`,
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `Assim que a foto for enviada, a remoção é acionada pelo agente e o(a) Sr(a) pode se direcionar para a <strong>${form.hospitalName?.split('-')?.[0] || form.businessUnitTitle?.split('-')?.[0]}</strong> no endereço <strong>${form.hospitalFullAddress?.split('-')?.[0] || form.businessUnitTitle?.split('-')?.slice(1, -1).join('-')}</strong>.`,
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `O(A) Sr(a). vai precisar levar a <strong>Declaração de Óbito original, o documento do falecido, o documento da pessoa responsável</strong>.​`,
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ display: 'list-item', mb: 1, p: 0, color: '#5C5C5C' }}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: `O(A) Sr(A) também vai precisar levar para a <strong>unidade as roupas que serão usadas para o velório</strong>.​`,
                                            }}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Question>
                ) : null}

                <Question
                    number={2}
                    text={
                        'O(A) Sr(a). também irá receber uma avaliação do atendimento telefônico para que que possamos continuar aprimorando nossos serviços. Ficou alguma dúvida ou tem algo mais em que eu possa ajudar o(a) Sr(a).?'
                    }
                >
                    <InputText
                        multiline
                        placeholder='Digite uma descrição'
                        label='Registre aqui qualquer informação que passar para o cliente  '
                        value={form.clientObservations}
                        onChange={(e: { target: { value: any } }) => handleFormChange({ clientObservations: e.target.value })}
                    />
                </Question>
                <Question
                    number={3}
                    text={
                        'Novamente gostaria de manifestar meus sentimentos! A Central de Óbitos permanece a disposição.'
                    }
                ></Question>

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
