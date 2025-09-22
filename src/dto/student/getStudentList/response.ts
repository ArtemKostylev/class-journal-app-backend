import type { DropdownOption } from '~/dto/shared/dropdownOption'

export interface StudentListItem {
    id: number
    name: string | null
    surname: string | null
    class: number | null
    program: string | null
    specialization: DropdownOption | null
}
