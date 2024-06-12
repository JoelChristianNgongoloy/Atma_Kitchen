import useAxios from "..";

export const getPenggunaanBahanBaku = async (tanggal_mulai, tanggal_selesai) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await useAxios.post(
      "/detail_pesanan/laporanPenggunaanBahanBakuMo", // Ubah alamat URL endpoint sesuai dengan rute yang didefinisikan di backend
      { tanggal_mulai, tanggal_selesai }, // Sesuaikan juga dengan parameter yang dikirimkan
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

