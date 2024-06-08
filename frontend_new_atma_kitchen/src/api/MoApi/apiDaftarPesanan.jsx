import useAxios from "..";

export const GetAllDaftarPesanan = async () => {
  try {
    const response = await useAxios.get("/daftarPesanan", {
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

export const GetAllPencatatanBahanBaku = async () => {
  try {
    const response = await useAxios.get("/pencatatanBahanBaku", {
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

export const updatePesananStatus = async (id) => {
  try {
    const response = await useAxios.put(
      `/daftarPesanan/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetTampilPesananByBulan = async (data) => {
  try {
    const response = await useAxios.post("/cetakPesanan", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
