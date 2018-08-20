const initAnalogInputs = {
    AI3000359: {
        title: "AI3000359",
        name: "Т_COMPR",
        description: "Температура компрессора ККБ",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000312: {
        title: "AI3000312",
        name: "P Freon",
        description: "Давление фреона",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000311: {
        title: "AI3000311",
        name: "DP FAN",
        description: "Давление на вентиляторе",
        status: "norm",
        units: "Pa",
        readOnly: true,
        value: 0
    },
    AI3000321: {
        title: "AI3000321",
        name: "SP T FOR",
        description: "Уставка приточного воздуха",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000366: {
        title: "AI3000366",
        name: "SP T RET",
        description: "Уставка вытяжного воздуха",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000313: {
        title: "AI3000313",
        name: "FAN SPEED",
        description: "Скорость вентилятора",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000314: {
        title: "AI3000314",
        name: "damperFreshLevel",
        description: "Заслонка свежего воздуха",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000178: {
        title: "AI3000178",
        name: "iT_HF_FO",
        description: "Температура на гребенке теплого пола",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000181: {
        title: "AI3000181",
        name: "oSP_HF",
        description: "Уставка подачи теплого пола",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000182: {
        title: "AI3000182",
        name: "oHEAT_HF",
        description: "Клапан теплого пола",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000177: {
        title: "AI3000177",
        name: "iT_HF_KITCH",
        description: "Температура теплого пола в кухне",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000160: {
        title: "AI3000160",
        name: "iT_KITCHEN",
        description: "Температура в кухне",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000183: {
        title: "AI3000183",
        name: "oHF_WC1",
        description: "Клапан теплого пола c/у 1",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000184: {
        title: "AI3000184",
        name: "oHF_WC2",
        description: "Клапан теплого пола c/у 2",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000185: {
        title: "AI3000185",
        name: "oHF_KITCH",
        description: "Клапан теплого пола кухни",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000186: {
        title: "AI3000186",
        name: "oHF_HALL",
        description: "Клапан теплого пола тамбура",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000159: {
        title: "AI3000159",
        name: "iT_SO_FO",
        description: "Температура на гребенке радиаторного отопления",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000169: {
        title: "AI3000169",
        name: "oSP_SO",
        description: "Уставка подачи радиаторного отопления",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000161: {
        title: "AI3000161",
        name: "oHEAT_SO",
        description: "Клапан радиаторного отопления",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000172: {
        title: "AI3000172",
        name: "iT_ZAL",
        description: "Температура в зале",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000187: {
        title: "AI3000187",
        name: "iT_CABINET",
        description: "Температура в кабинете",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000179: {
        title: "AI3000179",
        name: "iT_BEDROOM",
        description: "Температура в спальне",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000164: {
        title: "AI3000164",
        name: "oSO_ZAL",
        description: "Клапан радиатора зала",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000163: {
        title: "AI3000163",
        name: "oSO_KITCH",
        description: "Клапан радиатора кухни",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000165: {
        title: "AI3000165",
        name: "oSO_BEDROOM",
        description: "Клапан радиатора спальни",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000166: {
        title: "AI3000166",
        name: "oSO_CABINET",
        description: "Клапан радиатора кабинета",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000162: {
        title: "AI3000162",
        name: "oSO_BASE",
        description: "Клапан радиатора подвала",
        status: "norm",
        units: "%",
        readOnly: true,
        value: 0
    },
    AI3000174: {
        title: "AI3000174",
        name: "iT_GVS_R",
        description: "Температура в горячей воды в бойлере",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000157: {
        title: "AI3000157",
        name: "iT_SUP",
        description: "Температура подачи котлов",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000158: {
        title: "AI3000158",
        name: "iT_RET",
        description: "Температура обратки котлов",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000171: {
        title: "AI3000171",
        name: "oSP_KOT",
        description: "Рабочая уставка подачи котлов",
        status: "norm",
        units: "℃",
        readOnly: true,
        value: 0
    },
    AI3000375: {
        title: "AI3000375",
        name: "oPWR_DAY",
        description: "Потребление энергии. День.",
        status: "norm",
        units: "kW*h",
        readOnly: true,
        value: 7.912
    },
    AI3000376: {
        title: "AI3000376",
        name: "oPWR_NIGHT",
        description: "Потребление энергии. Ночь.",
        status: "norm",
        units: "kW*h",
        readOnly: true,
        value: 12.765
    },
    AI3000370: {
        title: "AI3000370",
        name: "oWATER_COUNT",
        description: "Счетчик воды",
        status: "norm",
        units: "m3",
        readOnly: true,
        value: 89180
    },
    AI3000371: {
        title: "AI3000371",
        name: "oWATER_DAY",
        description: "Воды сегодня потребили",
        status: "norm",
        units: "m3",
        readOnly: true,
        value: 120
    },
};

export const analogInputsReducer = (analogInputs = initAnalogInputs, action) => {
    switch (action.type) {
        case 'UPDATE_ANALOG_INPUT_VALUE':
            const updated = { ...analogInputs };
            updated[action.payload.title] = { ...updated[action.payload.title], value: action.payload.value };
            return updated;

        default:
            return { ...analogInputs };
    }
};