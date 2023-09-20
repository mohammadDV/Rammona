import moment from "moment-jalaali";
import { useI18n } from "vue-i18n";
export default function useMomentJalaali() {
  function toDate(date: string, type: "year" | "full" = "full") {
    const { locale } = useI18n();
    if (!date || date === "1000-01-01T00:00:00+03:25") return null;
    if (locale.value === "fa") {
      return moment(date).format(
        `jYYYY/jMM/jDD${type === "full" ? " | HH:mm:ss" : ""}`
      );
    } else {
      return type === "full"
        ? date.slice(0, 19).replace("T", "|")
        : date.slice(0, 10);
    }
  }
  /* A function that takes a date and returns a string. */
  function toDateLabel(date: string) {
    const date_year = moment(date).format("jYYYY/jMM/jDD");
    return date_year;
  }
  function timeDiff(min) {
    let minutes = min;
    const year = Math.floor(minutes / 60 / 24 / 365);
    minutes -= year * 60 * 24 * 365;
    const month = Math.floor(minutes / 60 / 24 / 30);
    minutes -= month * 60 * 24 * 30;
    const day = Math.floor(minutes / 60 / 24);
    minutes -= month * 60 * 24;
    const hh = Math.floor(minutes / 60);
    minutes -= hh * 60;
    const mm = Math.floor(minutes);
    minutes -= mm;
    return { year, month, day, minutes, hh, mm };
  }
  function toDateDiff(start: string, end = Date.now()) {
    return timeDiff(moment().diff(start, "minutes"));
  }
  return { toDate, toDateDiff, toDateLabel };
}
