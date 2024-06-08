import useAxios from "..";

export const getDaftarPesanan = async () => {
    try {
        const response = await useAxios.get("/pesanan/tampilDaftarPesanan", {
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

export const getSelesaikanPesanan = async () => {
    try {
        const response = await useAxios.get("/pesanan/tampilSelesaikanPesanan", {
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
        const response = await useAxios.put(`/pesanan/${id_pesanan}/updateDaftarPesanan`, {}, {
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

export const updatePesananMenjadiSelesai = async (id_pesanan, status_baru) => {
    try {
        const response = await useAxios.put(`/pesanan/${id_pesanan}/ubahStatusPesanan`, { status: status_baru }, {
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