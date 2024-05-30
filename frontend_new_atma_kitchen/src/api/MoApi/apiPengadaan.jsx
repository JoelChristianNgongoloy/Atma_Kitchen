import useAxios from "..";

export const GetAllPengadaan = async () => {
  try {
    const response = await useAxios.get("/pembelian", {
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

export const UpdatePengadaan = async (values) => {
  try {
    const response = await useAxios.put(
      `/pengadaan/${values.id}`,
      {
        harga_pengadaan: values.harga_pengadaan,
        id_bahan_baku: values.id_bahan_baku,
        jumlah_bahan_baku: values.jumlah_bahan_baku,
      },
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

export const CreatePengadaanWE = async (data) => {
  try {
    const response = await useAxios.post("/pengadaan", data, {
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

export const GetAllBahanMo = async () => {
  try {
    const response = await useAxios.get("/bahanBakuMo", {
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
