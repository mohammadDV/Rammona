export default function useCookies(name: string, option?: { maxAge: number }) {
  const cookie = useCookie(name, { ...option });
  const setCookies = (value: any) => {
    cookie.value = value;
  };
  const removeCookies = () => {
    cookie.value = null;
  };
  return { setCookies, removeCookies };
}
