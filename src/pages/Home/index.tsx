import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WizardNavigation from '../../components/ArrowNavigation'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'

export default function Home() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave,handleFormLogout } = useDeclarationStore()

    const handleNext = () => {
        if (form.comoPossoAjudalo === 'Comunicar um Óbito') {
            handleSave()
            navigate(RouterPath.SAUDACAO)
        } else if (form.comoPossoAjudalo === 'Outros Assuntos') {
            handleSave()
            handleFormLogout()
            navigate(RouterPath.SAIDA_FLUXO)
        } else {
            alert('Por favor, selecione uma opção antes de continuar.')
        }
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <PageTitle title='Novo Atendimento' />
                    </Grid>

                    <Grid item xs={12}>
                        <Question
                            number={1}
                            text={
                                'Aqui é o(a) "Seu Nome” da Central de Óbito do Grupo Zelo, como posso ajudá-lo?'
                            }
                        >
                            <ButtonGroup
                                value={form.comoPossoAjudalo}
                                label={'Clique no botão correspondente para iniciar o atendimento'}
                                options={['Comunicar um Óbito', 'Outros Assuntos']}
                                onClick={(value) => handleFormChange({ comoPossoAjudalo: value })}
                            />
                        </Question>
                    </Grid>
                </Grid>

                <WizardNavigation disablePrev onClickNext={handleNext} />
            </Container>
        </>
    )
}
