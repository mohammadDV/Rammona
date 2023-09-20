export const PROJECT_TYPE = [
    "بازدید اولیه",
    "ارزیابی خسارت",
    "مشاوره بیمه گذار",
    "دوره آموزشی",
] as const;

export const PROJECT_CATEGORY = [
    "نیروگاه",
    "پتروشیمی",
    "پالایشگاه",
    "سکو",
    "تاسیسات",
    "کارخانه فولاد",
    "کارخانه آلومینیوم",
] as const;

export const PROJECT_INSURER = [
    "بیمه ایران",
    "بیمه ملت",
    "بیمه کوثر",
    "بیمه سینا",
    "بیمه پارسیان",
    "بیمه آسیا",
    "بیمه البرز",
    "",
    "",
] as const;

export const PROJECT_POLICY = [
    "CMI",
    "MB",
    "CPI",
    "آتش سوزی",
    "انرژی",
] as const;

export const PROJECT_CURRENCY = ["ریال", "دلار", "یورو", "درصد"] as const;

export const PROJECT_EFFICIENCY = ["E", "F", "F"] as const;

export const PROJECT_STATUS = ["تایید", "عدم تایید"] as const;

export const CATEGORY = ["پروژه", "مالی"] as const;

export const CMI_COVERAGE = ["OD", "BI", "TPL"] as const;

export const PRODUCT_CAPACITIES = [
    "m^3/day",
    "MWh",
    "kg/day",
    "ton/day",
    "lit/day",
    "ft^3/day",
    "barrel/day",
    "MMSCFD",
];

export const TURBINES = [
    "SIEMENS / V94.2 / Ansaldo / Version 3",
    "SIEMENS / V94.2 / Ansaldo / Version 5",
    "SIEMENS / V94.2 / Siemens",
    "SIEMENS / V94.2 / Mapna / Niyam",
    "SIEMENS / V94.3",
    "GE / Frame 5",
    "GE / Frame 9",
    "MITSUBISHI / MW701D",
];

export const USERS_ROLES = ["ارزیاب", "کارشناس", "مشاور", "مدیریت"] as const;

export const TICKET = {
    statusList: [
        "جدید",
        "در انتظار پاسخ مشتری",
        "در حال پیگیری",
        "بسته شده",
    ] as const,
    replyStatus: ["در انتظار پاسخ مشتری", "در حال پیگیری", "بسته شده"],
};

export const SCENARIO_CATEGORY = [
    "آتش سوزی مخزن",
    "انفجار مخزن",
    "آسیب مکانیکی توربین",
] as const;

export const WEBSITE_INFO = {
    addr: "خیابان خواجه عبدالله انصاری، خیابان ابوذر غفاری، کوچه دوازدهم، پلاک ۱۴ طبقه سوم",
    phone: "02122873874",
    fax: "02122874374",
};
