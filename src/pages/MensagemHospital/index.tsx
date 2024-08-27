import { Box, Container, Grid, List, ListItem, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'

export default function MensagensHospital() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { form } = useDeclarationStore()
    const handleNext = () => {
        navigate(RouterPath.FINAL_NPS)
    }
    const handleBack = () => {
        navigate(RouterPath.ORIENTACOES_FINAIS)
    }
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Mensagem Agente Funerário' />
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
                    <Question number={1} text={'Mensagem para o agente funerário'}>
                        <InfoBox
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Box>
                                Declarante:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form?.declarantName}
                                </Typography>
                                <br />
                                Celular:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form?.declarantFirstPhone}
                                </Typography>
                                <br />
                                Falecido:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form?.deceasedPersonName}
                                </Typography>
                                <br />
                                Serviço:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form?.burialPlan}
                                </Typography>
                                <br />
                                {form?.burialPlan === 'Associado' && (
                                    <>
                                        Inscrição do plano:{' '}
                                        <Typography
                                            component={'span'}
                                            color={theme.palette.primary.dark}
                                        >
                                            {form?.burialPlanSubscribeNumber}
                                        </Typography>
                                        <br />
                                        Status do plano:{' '}
                                        <Typography
                                            component={'span'}
                                            color={theme.palette.primary.dark}
                                        >
                                            {form?.burialPlanStatus}
                                        </Typography>
                                        <br />
                                    </>
                                )}
                                Cidade / Estado:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form.city}
                                </Typography>{' '}
                                <br />
                                Local da Remoção:{' '}
                                <Typography component={'span'} color={theme.palette.primary.dark}>
                                    {form?.hospitalName || form?.residenceFullAddress}
                                </Typography>
                                <br />
                                {form.clientObservations ? (
                                    <>
                                        Mensagem para o cliente:{' '}
                                        <Typography
                                            component={'span'}
                                            color={theme.palette.primary.dark}
                                        >
                                            {form.clientObservations}
                                        </Typography>
                                    </>
                                ) : null}
                                <br />
                                {form.companyClothesForFuneral === 'Sim' ? (
                                    <>
                                        Atenção! <br />
                                        <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                            <ListItem
                                                sx={{
                                                    display: 'list-item',
                                                    mb: 0,
                                                    p: 0,
                                                    color: theme.palette.primary.dark,
                                                }}
                                            >
                                                <Typography
                                                    component='span'
                                                    color={theme.palette.primary.dark}
                                                    fontWeight={'bold'}
                                                >
                                                    Família quer que o Grupo Zelo disponibilize as
                                                    roupas para o velório.
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </>
                                ) : null}
                            </Box>
                        </InfoBox>
                    </Question>
                ) : null}

                {form.deceasedPersonLocation === 'Residência' ? (
                    <>
                        <Question number={1} text={'Mensagem para o agente funerário'}>
                            <InfoBox
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Box>
                                    Declarante:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.declarantName}
                                    </Typography>
                                    <br />
                                    Celular:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.declarantFirstPhone}
                                    </Typography>
                                    <br />
                                    Falecido:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.deceasedPersonName}
                                    </Typography>
                                    <br />
                                    Serviço:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.burialPlan}
                                    </Typography>
                                    <br />
                                    Inscrição do plano:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.burialPlanSubscribeNumber}
                                    </Typography>
                                    <br />
                                    Status do plano:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.burialPlanStatus}
                                    </Typography>
                                    <br />
                                    Cidade / Estado:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form.city}
                                    </Typography>{' '}
                                    <br />
                                    Local da Remoção:{' '}
                                    <Typography
                                        component={'span'}
                                        color={theme.palette.primary.dark}
                                    >
                                        {form?.hospitalName || form?.residenceFullAddress}
                                    </Typography>
                                    <br />
                                    {form.clientObservations ? (
                                        <>
                                            Mensagem para o cliente:{' '}
                                            <Typography
                                                component={'span'}
                                                color={theme.palette.primary.dark}
                                            >
                                                {form.clientObservations}
                                            </Typography>
                                        </>
                                    ) : null}
                                    <br />
                                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                        {form.companyClothesForFuneral === 'Sim' ? (
                                            <>
                                                Atenção! <br />
                                                <ListItem
                                                    sx={{
                                                        display: 'list-item',
                                                        mb: 0,
                                                        p: 0,
                                                        color: theme.palette.primary.dark,
                                                    }}
                                                >
                                                    <Typography
                                                        component='span'
                                                        color={theme.palette.primary.dark}
                                                        fontWeight={'bold'}
                                                    >
                                                        Família quer que o Grupo Zelo disponibilize
                                                        as roupas para o velório.
                                                    </Typography>
                                                </ListItem>
                                            </>
                                        ) : null}
                                    </List>
                                </Box>
                            </InfoBox>
                        </Question>
                        <Question
                            number={2}
                            text={
                                'Lembre-se de ligar para o agente funerário para certificar que ele recebeu a mensagem com as informações e vai entrar em contato com o cliente.'
                            }
                        ></Question>
                    </>
                ) : null}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
