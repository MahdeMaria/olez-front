import { DeclarationItem } from "../../../type/Declaration"
import { UpdateDeclarationBySessionDto } from "../updateDeclarations"


export function storeFormToDto(form: DeclarationItem): UpdateDeclarationBySessionDto {
    let kinshipDegreeOptions: Record<any, any> = {
        'Familiar / Amigo Próximo': 'CLOSE',
        'Familiar / Amigo Distante': 'DISTANT',
        'Não possui relacionamento direto com o falecido': 'NO_RELATIONSHIP',
    }
    let burialPlanOptions: Record<any, any> = {
        Associado: 'ASSOCIATED',
        Particular: 'PRIVATE',
        Seguradora: 'INSURANCE',
    }
    let burialPlanStatusOptions: Record<any, any> = {
        Carência: 'SHORTAGE',
        Ativo: 'ACTIVE',
        Suspenso: 'SUSPENDED',
        Cancelado: 'CANCELED',
    }
    let deceasedPersonLocationOptions: Record<any, any> = {
        'Hospital, UPA ou Posto de Saúde': 'HOSPITAL',
        Residência: 'RESIDENCE',
        IML: 'IML',
    }
    let funeralTypeOptions: Record<any, any> = {
        Sepultamento: 'BURIAL',
        Cremação: 'CREMATION',
        'Não Definiu': 'NOT_DEFINED',
    }

    let dto: UpdateDeclarationBySessionDto = {
        sessionId: form.sessionId || '',
        rating: form?.rating || 0,
        anotherBusinessUnit: form?.businessUnitTitle || '',
        burialPlan: burialPlanOptions?.[form?.burialPlan || ''],
        burialPlanCanInformCpf: form?.clienteConseguiuLocalizarCPF,
        burialPlanCpf: form.burialPlanCpf || '',
        burialPlanStatus: burialPlanStatusOptions?.[form?.burialPlanStatus || ''],
        burialPlanSubscribeNumber: form.burialPlanSubscribeNumber || '',
        burialPlanWasFound: form.planoFoiEncontrado,
        businessUnit: form.businessUnitTitle || '',
        clientDoubts: form.clientObservations || '',
        clientMessage: '', // Remover?
        companyClothesForFuneral: form.companyClothesForFuneral,
        deathCertificate: form.declaracaoDeObitoPreenchida,
        deathFirstContactQuestion: form.primeiroContatoDaFamilia,
        deceasedPersonCity: form.city,
        deceasedPersonHaveClothes: form.deceasedPersonHaveClothes,
        deceasedPersonLocationType:
            deceasedPersonLocationOptions?.[form?.deceasedPersonLocation || ''],
        deceasedPersonName: form.deceasedPersonName || '',
        deceasedPersonState: form.estadoOndeAconteceuOObito || '',
        declarantConditionToContinue: form.haveCondition,
        declarantFirstPhone: form.declarantFirstPhone || '',
        declarantKinshipDegree: kinshipDegreeOptions?.[form?.kinshipDegree || ''],
        declarantName: form.declarantName || '',
        declarantResponsibleForInformation: form.responsavelFornecerInformação,
        declarantSecundaryPhone: form.declarantSecundaryPhone || '',
        funeralType: funeralTypeOptions?.[form?.funeralType || ''],
        hospitalName: form.hospitalName || '',
        howCanIHelpYouQuestion: form.comoPossoAjudalo || '',
        notFoundDependent: form?.notFoundDependent || '',
        residenceFullAddress: form.residenceFullAddress || '',
        residenceNeighborhood: form.residenceNeighborhood || '',
        SAMUBeenToTheScene: form.samuIsOnTheLocal,
    }
    console.log(JSON.stringify(form, null, 2))
    console.log(JSON.stringify(dto, null, 2))
    // Object.entries(dto).forEach(([key, value]) => {
    //     if (value === "") {
    //         delete (dto as any)[key]
    //     }
    // })
    return dto
}
