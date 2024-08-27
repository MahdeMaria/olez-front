import { Container, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDeclarationStore } from '../../store/declarationStore'
import { MobileMask } from '../../utils/Masks'
import WizardNavigation from '../../components/ArrowNavigation'
import Header from '../../components/Header'
import InputText from '../../components/InputText'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'

export default function Saudacao() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave } = useDeclarationStore()
     const cannotMoveForward =
        !form.declarantName || !form.declarantFirstPhone 

    const handleNext = () => {
        handleSave()
        navigate(RouterPath.DADOS_DECLARANTE)
    }

    const handleBack = () => {
        navigate(RouterPath.HOME)
    }
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
                        <Box mb={4}>
                            <PageTitle title='Saudação' />
                        </Box>
                    </Grid>
                </Grid>

                <Question
                    number={1}
                    text={
                        'Em nome do Grupo Zelo gostaria de manifestar os meus sentimentos por sua perda. Neste momento preciso fazer algumas perguntas para realizar seu atendimento.'
                    }
                />

                <Question
                    number={2}
                    text={
                        'Preciso que você me diga seu nome completo e um telefone para contato, caso a ligação caia eu vou retornar imediatamente, ok?'
                    }
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <InputText
                                label='Digite o nome do declarante'
                                value={form.declarantName || ''}
                                onChange={(e) =>
                                    handleFormChange({ declarantName: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}></Grid>
                        <Grid item xs={12} lg={6}>
                            <InputText
                                label='Digite o primeiro celular de contato com o declarante'
                                value={
                                    form.declarantFirstPhone
                                        ? form.declarantFirstPhone.toString()
                                        : ''
                                }
                                mask={MobileMask}
                                onChange={(e) =>
                                    handleFormChange({ declarantFirstPhone: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <InputText
                                label='Digite o segundo celular de contato com o declarante'
                                notRequired
                                value={
                                    form.declarantSecundaryPhone
                                        ? form.declarantSecundaryPhone.toString()
                                        : ''
                                }
                                mask={MobileMask}
                                onChange={(e) =>
                                    handleFormChange({ declarantSecundaryPhone: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
                </Question>

                <Box mt={4}>
                    <WizardNavigation
                        onClickNext={handleNext}
                        disableNext={cannotMoveForward} 
                        onClickPrev={handleBack}
                    />
                </Box>
            </Container>
        </>
    )
}
