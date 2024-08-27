import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import AlertBox from '../../components/AlertBox'
import WizardNavigation from '../../components/ArrowNavigation'
import InputAutocomplete from '../../components/Autocomplete'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import InputSelect from '../../components/InputSelect'
import InputText from '../../components/InputText'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { hospitalsList } from '../../constants/hospitais'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'


export default function Localidade() {
    const navigate = useNavigate()

    const { form, handleFormChange, handleSave, handleFormLogout } = useDeclarationStore()
    const distinctCities = Array.from(new Set(hospitalsList.map((item) => item.city.trim())))
    const handleOptionClick = (option: string) => {
        handleFormChange({ dontHaveHospital: false, deceasedPersonLocation: option })
    }
    console.log(form)

    const handleNext = () => {
        if (form.city) {
            handleFormChange({ cityIsSaved: true })
        }
        if (
            form.estadoOndeAconteceuOObito === 'Outros Estados' ||
            form.city === 'Outras Cidades' ||
            form.deceasedPersonLocation === 'IML'
        ) {
            handleSave()
            handleFormLogout()
            navigate(RouterPath.SAIDA_FLUXO)
            return
        }

        if (form.estadoOndeAconteceuOObito === 'Minas Gerais') {
            handleFormChange({ estadoOndeAconteceuOObitoIsSaved: 'Minas Gerais' })
        }

        if (form.deceasedPersonLocation === 'Residência') {
            if (form.hospitalName) {
                handleFormChange({ hospitalName: '' })
                handleSave()
                navigate(RouterPath.ENDERECO)
                return
            } else {
                handleSave()
                navigate(RouterPath.ENDERECO)
                return
            }
        }
        if (form.deceasedPersonLocation === 'Hospital, UPA ou Posto de Saúde') {
            handleFormChange({ deceasedPersonLocationIsHospital: true })
            if (
                (form.dontHaveHospital && form.hospitalFullAddress && form.hospitalName) ||
                (!form.dontHaveHospital && form.hospitalName)
            ) {
                handleSave()
                navigate(RouterPath.DECLARACAO_DE_OBITO)
                return
            }
        }
    }

    const handleBack = () => {
        if (form.burialPlan === 'Particular') {
            navigate(RouterPath.IDENTIFICACAO_SERVICO)
        } else {
            navigate(RouterPath.IDENTIFICACAO_ASSOCIADO_BEM_SUCEDIDA)
        }
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Localidade e Local do Óbito' />
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
                    text={'Por favor, me informe o estado onde aconteceu o óbito?'}
                >
                    <ButtonGroup
                        label={'Clique no botão correspondente à resposta do cliente​'}
                        options={['Minas Gerais', 'Outros Estados']}
                        value={form.estadoOndeAconteceuOObito}
                        onClick={(val) => {
                            handleFormChange({ estadoOndeAconteceuOObito: val })
                        }}
                    />
                </Question>

                {form.estadoOndeAconteceuOObito === 'Minas Gerais' && (
                    <>
                        <Question number={2} text={'Agora me diga qual foi a cidade?'}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <InputSelect
                                        label='Digite ou selecione a cidade'
                                        value={form.city || ''}
                                        options={distinctCities}
                                        onChange={(e) => {
                                            handleFormChange({
                                                city: e.target.value as string,
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    lg={6}
                                    sx={{
                                        mt: 3,
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <ButtonGroup
                                        value={form.city}
                                        options={['Outras Cidades']}
                                        onClick={(val) => {
                                            handleFormChange({ city: val })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Question>

                        {form.city && (
                            <Question
                                number={3}
                                text={
                                    'O(A) Sr(a). pode me dizer qual a localização do falecido? Hospital, residência ou IML?'
                                }
                            >
                                <ButtonGroup
                                    label={'Clique no botão onde o óbito ocorreu​'}
                                    value={form.deceasedPersonLocation}
                                    options={[
                                        'Hospital, UPA ou Posto de Saúde',
                                        'Residência',
                                        'IML',
                                    ]}
                                    onClick={handleOptionClick}
                                />
                                {form.deceasedPersonLocation ===
                                    'Hospital, UPA ou Posto de Saúde' && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} lg={6}>
                                            <InputAutocomplete
                                                label='Digite ou selecione o nome do local'
                                                value={form.hospitalName || ''}
                                                options={hospitalsList.map(
                                                    (item) => item.hospitalUpa,
                                                )}
                                                onChange={(value) => {
                                                    handleFormChange({
                                                        hospitalName: value as string,
                                                    })
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            lg={6}
                                            sx={{
                                                mt: 3,
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <ButtonGroup
                                                value={
                                                    !!form.dontHaveHospital
                                                        ? 'Não encontrei o Hospital, UPA ou Posto de Saúde'
                                                        : ''
                                                }
                                                options={[
                                                    'Não encontrei o Hospital, UPA ou Posto de Saúde',
                                                ]}
                                                onClick={() => {
                                                    handleFormChange({ dontHaveHospital: true })
                                                }}
                                            />
                                        </Grid>
                                        {!form.dontHaveHospital &&
                                        [
                                            'Hospital das Clínicas (HC)',
                                            'Hospital Municipal São Judas Tadeu',
                                        ].includes(form?.hospitalName || '') ? (
                                            <Grid item xs={12} lg={12}>
                                                <AlertBox
                                                    label={'AVISAR AO CLIENTE:'}
                                                    errors={[
                                                        ...(form.hospitalName ===
                                                        'Hospital das Clínicas (HC)'
                                                            ? [
                                                                  `Como informei no atendimento, no Hospital das Clínicas as remoções só são permitidas das 8h às 18h e é preciso ter uma pessoa responsável com a Declaração de Óbito original no local.`,
                                                              ]
                                                            : []),
                                                        ...(form.hospitalName ===
                                                        'Hospital Municipal São Judas Tadeu'
                                                            ? [
                                                                  `Como informei no atendimento, no Hospital São Judas Tadeu as remoções só são permitidas com acompanhamento de um familiar.`,
                                                              ]
                                                            : []),
                                                    ]}
                                                />
                                            </Grid>
                                        ) : null}
                                    </Grid>
                                )}
                            </Question>
                        )}
                        {form.dontHaveHospital && (
                            <Question
                                number={4}
                                text={
                                    'O(A) Sr(a). pode me informar por favor o endereço do Hospital/ UPA/ Posto de Saúde?'
                                }
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <InputText
                                            label='Digite o nome do Hospital'
                                            value={form.hospitalName || ''}
                                            onChange={(e) =>
                                                handleFormChange({ hospitalName: e.target.value })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <InputText
                                            label='Digite o endereço do Hospital'
                                            value={form.hospitalFullAddress || ''}
                                            onChange={(e) =>
                                                handleFormChange({
                                                    hospitalFullAddress: e.target.value,
                                                })
                                            }
                                            multiline
                                        />
                                    </Grid>
                                </Grid>
                            </Question>
                        )}
                    </>
                )}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
