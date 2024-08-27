import { format } from 'date-fns'

export function formatCEP(cep: string | null): string {
    if (!cep) return ''
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
    return cep
}

export function formatCPF(cpf: string | null): string {
    if (!cpf) return ''
    cpf = cpf.replace(/\D/g, '')
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    return cpf
}

export function formatCNPJ(cnpj: string | null): string {
    if (!cnpj) return ''
    cnpj = cnpj.replace(/\D/g, '')
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    return cnpj
}

export function formatDate(unformatedDate: string | null): string {
    if (!unformatedDate) return ''
    const date = new Date(unformatedDate + 'T00:00:00-03:00') // Fuso horário UTC-3 (Brasília)

    if (isNaN(date.getTime())) {
        return ''
    }

    return format(date, 'dd/MM/yyyy')
}

export function formatDateAndTime(unformattedDateTime: string | null): string {
    if (!unformattedDateTime) return ''

    const dateTime = new Date(unformattedDateTime + '-03:00')

    if (isNaN(dateTime.getTime())) {
        return ''
    }

    return format(dateTime, 'dd/MM/yyyy HH:mm:ss')
}

export function validateEmail(inputEmail: string, t: (key: string) => string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(inputEmail)) {
        return t('common.validEmail')
    } else {
        return null
    }
}
