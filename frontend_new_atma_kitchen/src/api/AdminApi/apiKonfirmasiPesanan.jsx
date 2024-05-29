import useAxios from "..";

// API untuk mendapatkan daftar pesanan yang sudah lunas
export const GetAllPesananSudahLunas = async () => {
  try {
    const response = await useAxios.get("/pesanan/menungguKonfirmasi", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data.data; // Sesuaikan dengan struktur respons dari backend
  } catch (error) {
    throw error.response.data; // Melempar pesan kesalahan dari respons API
  }
};

// API untuk mengirim pembaruan konfirmasi pesanan menjadi Dikonfirmasi
export const UpdateStatusPesanan = async (id_pesanan, total_bayar) => {
  try {
    const response = await useAxios.post(
      `/pesanan/${id_pesanan}/konfirmasiPembayaran`,
      { total_bayar },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data; // Mengembalikan data respons dari backend
  } catch (error) {
    throw error.response.data; // Melempar pesan kesalahan dari respons API
  }
};
