/**
 * # useStoreFetch
 * @param getData - store function to get data
 * @param {boolean} loadingDefault - set whether loading is true at first or not
 */
export default function useStoreFetch<T>(
  getData: () => Promise<T>,
  loadingDefault: boolean = true
) {
  // fetch data
  const fetchLoading = useState("storeFetchLoading", () => loadingDefault);
  const route = useRoute();
  const filterQueries = computed(() => {
    const queries = { ...route.query };
    if ("page" in queries) delete queries.page;
    if ("id" in queries) delete queries.id;
    return Object.keys(queries).length > 0 ? queries : false;
  });
  const handleFetchData = async () => {
    fetchLoading.value = true;
    if (!getData) {
      window.location.reload();
    }
    try {
      if (Object.keys(filterQueries.value).length === 0) {
        return await getData();
      }
    } finally {
      fetchLoading.value = false;
    }
  };
  onMounted(() => {
    if (process.client) {
      if (Object.keys(filterQueries.value).length === 0) {
        handleFetchData();
      } else {
        fetchLoading.value = false;
      }
    }
  });
  return { fetchLoading, handleFetchData };
}
