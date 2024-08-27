import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AlertBox from '../../components/AlertBox'
import WizardNavigation from '../../components/ArrowNavigation'
import InputAutocomplete from '../../components/Autocomplete'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import InputText from '../../components/InputText'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { bairrosList } from '../../constants/bairros'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'

export default function EnderecoCompleto() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave } = useDeclarationStore()
    const bairroOptions = Array.from(
        new Set(
            bairrosList
                .filter((item) => item.city.trim() === form.city?.trim())
                .map((item) => item.bairro.trim()),
        ),
    )
   
    const cannotMoveForward =
    !form.residenceNeighborhood || !form.residenceFullAddress

    const handleOptionClick = (option: string) => {
        handleFormChange({ neighborhoodNotFound: true })
        handleFormChange({ residenceNeighborhood: option })
    }

    const handleNext = () => {
        handleSave()
        navigate(RouterPath.DECLARAÇÃO_DE_OBITO_RESIDENCIA)
    }

    const handleBack = () => {
        navigate(RouterPath.LOCALIDADE)
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Endereço' />
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

                <Question
                    number={1}
                    text={
                        'Agora preciso que o(a) Sr(a) me informe o bairro da residência para que eu possa encontrar a unidade mais próxima.'
                    }
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                            <InputAutocomplete
                                label='Digite o bairro'
                                disabled={bairroOptions.length === 0}
                                value={(form?.residenceNeighborhood as string) || ''}
                                options={bairroOptions}
                                onChange={(value) =>
                                    handleFormChange({
                                        residenceNeighborhood: value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <ButtonGroup
                                options={['Não encontrei o bairro']}
                                value={form.neighborhoodNotFound ? 'Não encontrei o bairro' : ''}
                                onClick={handleOptionClick}
                            />
                        </Grid>
                    </Grid>

                    {bairroOptions.length === 0 && (
                        <Grid item xs={12} lg={12}>
                            <AlertBox
                                label={'BAIRRO NÃO ENCONTRADO:'}
                                errors={[
                                    'Clique no botão "Não encontrei o bairro” para prosseguir.',
                                ]}
                            />
                        </Grid>
                    )}
                </Question>

                {/* {form.neighborhoodNotFound ? ( */}
                <Question number={2} text={'Agora me informe por favor, o endereço completo.'}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={12}>
                            <InputText
                                multiline
                                rows={3}
                                label='Digite o endereço completo'
                                value={form.residenceFullAddress || ''}
                                onChange={(e) =>
                                    handleFormChange({ residenceFullAddress: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
                </Question>
                {/* ) : null} */}

                <WizardNavigation onClickNext={handleNext} disableNext={cannotMoveForward} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
