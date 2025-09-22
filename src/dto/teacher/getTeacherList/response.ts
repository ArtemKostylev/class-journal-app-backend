import type { DropdownOption } from '~/dto/shared/dropdownOption'

export interface GetTeacherListResponseDto {
    id: number
    name: string | null
    surname: string | null
    parent: string | null
    user: DropdownOption | undefined
}
