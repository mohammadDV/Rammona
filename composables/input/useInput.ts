export default function useInput() {
    function putCommaForNumber(num: string) {
        // format number 1234567 to 1,234,567
        // if (num)
        //   return String(num)
        //     .replace(/[^-?\d+\.?\d*]/g, "")
        //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return ""; // TODO : decimal is considered!!!!
        return num;
    }
    function numberic(string: string) {
        return string.replace(/\D/g, "");
    }
    function precisionNumber(
        num: string,
        precision: string | number | null = null
    ) {
        if (num !== undefined) {
            if (!precision) {
                return num;
            }
            if (String(precision) === "0") {
                return "";
            } else if (precision) {
                return num.replace(/\D/g, "").slice(0, Number(precision));
            } else {
                return num.replace(/\D/g, "");
            }
        }
        return "";
    }
    function maxNumber(
        num: null | string | number = null,
        max: number | string | null = null
    ) {
        if (num && max) {
            if (Number(max) < Number(num)) {
                return max;
            }
        }
        return num;
    }
    function maxLength(num: any = null, maxLength: number | null = null) {
        if (num && maxLength) {
            if (String(num).length > maxLength) {
                return String(num).slice(0, 11);
            }
        }
        return num;
    }
    function formatNumber(num: string | number | null) {
        if (num) {
            return String(num).replace(/\D/g, "");
        }
        return null;
    }
    function convertToPersianNumber(EnglishNumberInString: string) {
        return EnglishNumberInString.replace(
            /\d/g,
            (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]
        );
    }
    function convertToEnglishNumber(PersianNumberInString: string) {
        return PersianNumberInString.replace(/[۰-۹]/g, (d) =>
            String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
        );
    }
    function convertToSlug(text: string) {
        return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    }
    return {
        putCommaForNumber,
        precisionNumber,
        maxNumber,
        formatNumber,
        convertToPersianNumber,
        convertToEnglishNumber,
        convertToSlug,
        maxLength,
        numberic,
    };
}
