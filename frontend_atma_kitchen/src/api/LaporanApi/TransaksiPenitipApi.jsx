import useAxios from "..";

export const GetAllTransaksiPenitip = async () => {
    try {
      const response = await useAxios.get("/laporan/transaksi-penitip", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data.data; 
    } catch (error) {
      throw error.response.data;
    }
}