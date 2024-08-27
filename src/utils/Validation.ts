export function isCpfValid(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11) {
        return false
    }

    const dv1 = cpf.substring(9, 10)
    const dv2 = cpf.substring(10)
    let sum = 0

    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i)
    }

    let remainder = sum % 11
    if (remainder < 2) {
        if (parseInt(dv1) !== 0) {
            return false
        }
    } else {
        if (parseInt(dv1) !== 11 - remainder) {
            return false
        }
    }

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i)
    }

    remainder = sum % 11
    if (remainder < 2) {
        if (parseInt(dv2) !== 0) {
            return false
        }
    } else {
        if (parseInt(dv2) !== 11 - remainder) {
            return false
        }
    }

    return true
}

export function isCnpjValid(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length != 14) return false

    let tamanhoTotal = cnpj.length - 2
    let cnpjSemDigitos = cnpj.substring(0, tamanhoTotal)
    const digitosVerificadores = cnpj.substring(tamanhoTotal)
    let soma = 0
    let pos = tamanhoTotal - 7
    let i: number
    let resultado: number
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += +cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--
        if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != +digitosVerificadores.charAt(0)) return false

    tamanhoTotal = tamanhoTotal + 1
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal)
    soma = 0
    pos = tamanhoTotal - 7
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += +cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--
        if (pos < 2) pos = 9
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != +digitosVerificadores.charAt(1)) return false

    return true
}
