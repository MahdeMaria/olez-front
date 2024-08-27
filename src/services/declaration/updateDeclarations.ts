import { api } from '../api'

export type UpdateDeclarationBySessionResponse = Partial<{
    sessionId: string
    rating: number
    howCanIHelpYouQuestion: string
    declarantName: string
    declarantFirstPhone: string
    declarantSecundaryPhone: string
    declarantKinshipDegree: string
    deathFirstContactQuestion: string
    declarantResponsibleForInformation: string
    declarantConditionToContinue: string
    burialPlan: string
    burialPlanCanInformCpf: string
    burialPlanWasFound: string
    burialPlanCpf: string
    burialPlanSubscribeNumber: string
    burialPlanStatus: string
    notFoundDependent: string
    deceasedPersonName: string
    deceasedPersonState: string
    deceasedPersonCity: string
    deceasedPersonLocationType: string
    deceasedPersonHaveClothes: string
    companyClothesForFuneral: string
    residenceNeighborhood: string | unknown
    residenceFullAddress: string
    hospitalName: string
    SAMUBeenToTheScene: string
    deathCertificate: string
    funeralType: string
    businessUnit: string
    anotherBusinessUnit: string
    clientDoubts: string
    clientMessage: string
}>
export type UpdateDeclarationBySessionDto = UpdateDeclarationBySessionResponse

export async function updateDeclarationBySession(dto: UpdateDeclarationBySessionDto) {
    const { data } = await api.put<UpdateDeclarationBySessionResponse>('/declaration/session', dto)
    return data
}
