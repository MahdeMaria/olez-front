import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { updateDeclarationBySession } from '../services/declaration/updateDeclarations'
import { storeFormToDto } from '../services/declaration/utils/storeFormToDto'
import { DeclarationItem } from '../type/Declaration'


type DeclarationStore = {
    form: DeclarationItem
    handleFormChange: (data: DeclarationItem) => void
    handleSave: () => void
    handleFormLogout: () => void
}

export const useDeclarationStore = create<DeclarationStore>()(
    persist(
        (set, get) => ({
            form: {
                sessionId: uuidv4(),
            },
            handleFormChange: (data) =>
                set((state) => {
                    return { form: { ...state.form, ...data } }
                }),
            handleSave: () => {
                const form = get().form
                const dto = storeFormToDto(form)
                updateDeclarationBySession(dto).then(() => console.info('201 - OK'))
            },
            handleFormLogout: () => {
                sessionStorage.clear()
                set(() => ({
                    form: {
                        sessionId: uuidv4(),
                    },
                }))
            },
        }),
        {
            name: 'form-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
