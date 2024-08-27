import { api } from './api'

export type GetHealthCheckResponse = {
    title: string
    description: string
    version: string
    status: string
}

export async function getHealthCheck() {
    const { data } = await api.get<GetHealthCheckResponse>('/status')
    console.info({ data })
    return data
}
