export const GROUP_PERIODS = {
    FIRST_HALF: () =>
        new Map([
            ['8', []],
            ['9', []],
            ['10', []],
            ['11', []],
        ]),
    SECOND_HALF: () =>
        new Map([
            ['0', []],
            ['1', []],
            ['2', []],
            ['3', []],
            ['4', []],
        ]),
}

export const PROGRAMS_RU: Record<string, string> = {
    PP_5: '(5)ПП',
    PP_8: '(8)ПП',
    OP: 'ОП',
}

export const DATE_FORMAT = 'dd.MM.yyyy'
