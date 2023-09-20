export default function useLoading(isLayout = false) {
    const pageLoading = useState("pageLoading", () => true);
    onMounted(() => {
        if (!isLayout) {
            nextTick(() => {
                pageLoading.value = false;
            });
        }
    });
    return { pageLoading };
}
