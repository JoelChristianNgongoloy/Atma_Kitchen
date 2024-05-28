import useAxios from "..";

// API untuk mendapatkan pesanan yang memerlukan input jarak
export const GetAllPesananPerluInput = async () => {
  try {
    const response = await useAxios.get("/pesanan/inputJarak", {
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
  
// API untuk mengirim pembaruan jarak pengiriman
export const UpdateJarakPengiriman = async (id_pesanan, jarak_pengiriman) => {
  try {
    const response = await useAxios.post(
      `/pesanan/${id_pesanan}/updateJarak`,
      { jarak_pengiriman },
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
