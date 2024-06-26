import axios from "axios";
export const BASE_URL = "http://127.0.0.1:8000";
export const getFotoProduk = (fotoProduk) => {
  return `${BASE_URL}/storage/produks/${fotoProduk}`;
};
export const getBukti = (bukti) => {
  return `${BASE_URL}/storage/payments/${bukti}`;
};
const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});
export default useAxios;
