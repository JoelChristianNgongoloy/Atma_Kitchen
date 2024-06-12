import useAxios from "../..";

export const getDaftarPesanan = async () => {
    try {
        const response = await useAxios.get("/pesanan/tampilKonfirmasiPenerimaan", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updatePesanan = async (id_pesanan) => {
    try {
        const response = await useAxios.put(`/pesanan/${id_pesanan}/customerUpdateStatus`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};