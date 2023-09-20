export default function useFunctions() {
  const env = useRuntimeConfig();
  const { getToken } = useAuth();
  const { infoToast, successToast } = useToastNotif();
  function download(downloadUrl: string, file_name = "download_file") {
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_blank";
    a.download = file_name;
    document.body.appendChild(a);
    a.click();
    const t = setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      clearTimeout(t);
    }, 0);
    return true;
  }
  function downloadReport(reportUrl: string, file_name = "download_file") {
    const url = `${env.public.baseUrl}${reportUrl}`;
    successToast("با موفقیت دانلود شد");
    return download(url, file_name);
  }
  function checkFileIsImage(file: any) {
    const fileType = file["type"];
    // const validImageTypes = [
    //   "image/gif",
    //   "image/jpeg",
    //   "image/png",
    //   "image/svg+xml",
    // ];
    if (fileType.includes("image")) {
      return true;
    }
    throw TypeError("file must be image");
  }
  const getFileUrl = (link: string) => {
    if (link) {
      if (!link.includes("http")) {
        return env.public.baseUrl.replace(/\/$/, "") + link;
      }
      return link;
    }
    return "";
  };
  const capitalize = ([first, ...rest]: any) =>
    first.toUpperCase() + rest.join("").toLowerCase();

  const removeObjEmpty = <T>(obj: T) => {
    const newObj = { ...obj };
    for (const i in newObj) {
      if (!newObj[i]) delete newObj[i];
    }
    return newObj;
  };

  const createFormdata = <T>(obj: T) => {
    const formdata = new FormData();
    for (const i in obj) {
      formdata.append(i, obj[i] as string | Blob);
    }
    return formdata;
  };

  /**
   * # convertToNormalNumber
   * convert Scientific Notation to correct Javascript number format
   * @param num
   */
  function convertToNormalNumber(num: number | string) {
    const str = String(num);
    if (str.includes("e")) {
      const matched = str.match(/(?<=e).*/);
      const fixNum = matched ? Math.abs(Number(matched[0])) : 0;
      return Number(str).toFixed(fixNum);
    }
    return Number(num);
  }
  function createSelectList(list: string[]) {
    return list.map((item) => ({
      value: item,
      title: item,
    }));
  }
  return {
    download,
    checkFileIsImage,
    getFileUrl,
    capitalize,
    removeObjEmpty,
    createFormdata,
    convertToNormalNumber,
    downloadReport,
    createSelectList,
  };
}
