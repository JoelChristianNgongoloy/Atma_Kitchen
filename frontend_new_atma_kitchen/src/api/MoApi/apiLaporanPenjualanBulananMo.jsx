import useAxios from "..";

export const getLaporanPenjualanBulanan = async (tahun) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await useAxios.post(
      "/pesanan/laporanPenjualanBulananMo",
      { tahun },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error response:", error.response || error.message);
    throw error.response ? error.response.data : error.message;
  }
};