import useAxios from "..";


export const GetPesanan = async () => {
    try {
      const response = await useAxios.get(`/pesanan/konfirmasi`, {
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

export const konfirmasiPesanan = async (values) => {
    try {
        const response = await useAxios.put(`/pesanan/konfirmasi/${values}`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}