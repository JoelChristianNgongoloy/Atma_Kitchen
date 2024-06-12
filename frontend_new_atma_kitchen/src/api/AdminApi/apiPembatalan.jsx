import useAxios from "..";

export const getDaftarPesanan = async () => {
    try {
        const response = await useAxios.get("/pesanan/tampilPesananTelatBayar", {
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
        const response = await useAxios.put(`/pesanan/pembatalanTransaksiTelatBayar/${id_pesanan}`, {}, {
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