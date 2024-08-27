
import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import MultipleChoice from '../../components/MultipleChoice'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { bairrosList } from '../../constants/bairros'
import { hospitalsList } from '../../constants/hospitais'
import { neighborhoodNotFoundList } from '../../constants/neighborhoodNotFound'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'

export default function DirecionamentoUnidade() {
    const { form, handleFormChange } = useDeclarationStore()
    const navigate = useNavigate()
    const selectedHospital = hospitalsList.find((item) => item.hospitalUpa === form.hospitalName)
    const selectedBairros = bairrosList.find((item) => item.bairro === form.residenceNeighborhood)
    const selectedCity =
        form.neighborhoodNotFound || form.dontHaveHospital
            ? neighborhoodNotFoundList.find((item) => item.city === form.city)
            : undefined
    const selectedHospitalOptions = [
        selectedHospital?.unidadeGrupoZeloFirstOption,
        selectedHospital?.unidadeGrupoZeloSecondOption,
        selectedHospital?.unidadeGrupoZeloThirdOption,
    ].filter((item) => !!item)
    const selectedBairroOptions = [
        selectedBairros?.unidadeGrupoZeloFirstOption,
        selectedBairros?.unidadeGrupoZeloSecondOption,
        selectedBairros?.unidadeGrupoZeloThirdOption,
    ].filter((item) => !!item)
    const selectedCityOptions = [
        selectedCity?.unidadeGrupoZeloFirstOption,
        selectedCity?.unidadeGrupoZeloSecondOption,
        selectedCity?.unidadeGrupoZeloThirdOption,
    ].filter((item) => !!item)

    const rawOptions = [
        ...selectedHospitalOptions,
        ...selectedBairroOptions,
        ...selectedCityOptions,
    ]
    const opcoes = rawOptions.map((item) => ({
        Unidade: item
            ?.replace('-', '$')
            .split('$')
            .reduce((acc, atual, index) => {
                if (index === 0) {
                    acc = acc + `<strong>${atual}</strong> <br/>`
                }
                acc = acc + atual

                return acc
            }, ''),
    }))

    const handleNext = () => {
        if (!!form.businessUnitTitle) {
            navigate(RouterPath.ORIENTACOES_FINAIS)
        }
    }

    const handleBack = () => {
        navigate(RouterPath.DESTINACAO)
    }
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Direcionamento Unidade' />
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
                        'As unidades mais próximas são (ler unidades).Qual fica melhor para o(a) Sr(a).?'
                    }
                >
                    <MultipleChoice
                        columns={['Unidade']}
                        rows={opcoes}
                        value={rawOptions.findIndex((item) => form.businessUnitTitle === item)}
                        onChange={(index) => {
                            if (index != null) {
                                handleFormChange({
                                    businessUnitTitle: rawOptions[index],
                                })
                            }
                        }}
                    />
                    {/* <MultipleChoice columns={['OUTRAS UNIDADES (CASO NECESSÁRIO)']} rows={outra} /> */}
                </Question>

                <WizardNavigation
                    onClickNext={handleNext}
                    disableNext={!form.businessUnitTitle}
                    onClickPrev={handleBack}
                />
            </Container>
        </>
    )
}
