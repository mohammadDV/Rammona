import { configure, defineRule } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
    defineRule("required", required);
    defineRule("length", length);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("numeric", numeric);
    defineRule("same", same);
    defineRule("email", email);
    defineRule("isPersian", isPersian);
    defineRule("isNationalId", isNationalId);
    defineRule("isPhone", isPhone);
    defineRule("isHomePhone", isHomePhone);
    defineRule("isCardNumber", isCardNumber);
    defineRule("isIbanNumber", isIbanNumber);
    configure({
        bails: false,
        validateOnChange: false,
        validateOnBlur: true,
        validateOnModelUpdate: true,
        validateOnInput: false,
    });
});
/**
 * How to make new rule?
 * to use i18 errors don't return `string` as error
 * return `false` and add error in `generateMessage`
 */
// custom-validators
function required(value: any) {
    if (String(value) === "0") {
        return true;
    }
    if (value && value.trim()) {
        return true;
    }
    return "این فیلد ضروری است!";
}
function same(value: string | number, [sameAs]: any) {
    if (value && value === sameAs) {
        return true;
    }
    return "این فیلد اشتباه وارد شده است!";
}
function length(value: string, [length]: any) {
    if (value && value.length === length) {
        return true;
    }
    return `تعداد کاراکتر باید ${length} باشد!`;
}
function min(value: string | number, [min]: any) {
    if (value && Number(value) > Number(min)) {
        return true;
    }
    return ` مقدار وارد شده باید بیشتر از ${min} باشد!`;
}
function max(value: string | number, [max]: any) {
    if (value && Number(value) < Number(max)) {
        return true;
    }
    return ` مقدار وارد شده باید کمتر از ${max} باشد!`;
}
function numeric(value: string) {
    function toEnglishNumber(str: string) {
        const persianNumbers = [
            /۰/g,
            /۱/g,
            /۲/g,
            /۳/g,
            /۴/g,
            /۵/g,
            /۶/g,
            /۷/g,
            /۸/g,
            /۹/g,
        ];
        const arabicNumbers = [
            /٠/g,
            /١/g,
            /٢/g,
            /٣/g,
            /٤/g,
            /٥/g,
            /٦/g,
            /٧/g,
            /٨/g,
            /٩/g,
        ];
        if (typeof str === "string") {
            for (let i = 0; i < 10; i++) {
                str = str
                    .replace(persianNumbers[i], i)
                    .replace(arabicNumbers[i], i);
            }
        }
        return str;
    }
    if (String(value) === "0") return true;
    if (value && !!Number(toEnglishNumber(value))) {
        return true;
    }
    return "فقط عدد قابل قبول است!";
}
function email(value: string) {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
        return "ایمیل وارد شده نامعتبر است!";
    }
    return true;
}
function isPersian(value: string) {
    if (
        /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u0020\u2000-\u200F\u2028-\u202F\u06A9\u06AF\u06BE\u06CC\u0629\u0643\u0649-\u064B\u064D\u06D5\s]+$/.test(
            value
        )
    ) {
        return true;
    }
    return false;
}
function isNationalId(input) {
    if (
        !/^\d{10}$/.test(input) ||
        input === "0000000000" ||
        input === "1111111111" ||
        input === "2222222222" ||
        input === "3333333333" ||
        input === "4444444444" ||
        input === "5555555555" ||
        input === "6666666666" ||
        input === "7777777777" ||
        input === "8888888888" ||
        input === "9999999999"
    ) {
        return false;
    }
    const check = parseInt(input[9]);
    let sum = 0;
    for (let i = 0; i < 9; ++i) {
        sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    if ((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11))
        return true;
    return false;
}
function isPhone(value: string | number) {
    if (/^(\+98|0098|98|0)?9\d{9}$/.test(String(value))) {
        return true;
    }
    return false;
}
function isHomePhone(value: string | number) {
    if (/^(0[1-9]{2})[2-9][0-9]{7}$/.test(String(value))) return true;

    return false;
}

function isCardNumber(card: string) {
    if (typeof card === "undefined" || card === null || card.length !== 16) {
        return false;
    }
    let cardTotal = 0;
    for (let i = 0; i < 16; i += 1) {
        const c = Number(card[i]);
        if (i % 2 === 0) {
            cardTotal += c * 2 > 9 ? c * 2 - 9 : c * 2;
        } else {
            cardTotal += c;
        }
    }
    if (cardTotal % 10 === 0) return true;
    return false;
}
function isIbanNumber(str: string | number) {
    str = "IR" + str;
    const pattern = /IR[0-9]{24}/;
    if (pattern.test(str) && str.length !== 26) {
        return true;
    }
    let newStr = str.substr(4);
    const d1 = str.charCodeAt(0) - 65 + 10;
    const d2 = str.charCodeAt(1) - 65 + 10;
    newStr += d1.toString() + d2.toString() + str.substr(2, 2);
    let remainder = newStr;
    let block;
    while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
    }
    remainder = parseInt(remainder, 10) % 97;
    if (remainder === 1) {
        return true;
    }
    return false;
}
