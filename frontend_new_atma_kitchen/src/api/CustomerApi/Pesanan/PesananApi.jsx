import useAxios from "../..";

export const GetPesanan = async (idpesan) => {
  try {
    const response = await useAxios.get(`/detail_pesan/${idpesan}`, {
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

export const GetInputAlamat = async (idpesan) => {
  try {
    const response = await useAxios.get(`/showInputAlamat/${idpesan}`, {
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

export const GetPesananByKeranjang = async (idpesan) => {
  try {
    const response = await useAxios.get(`/detail_pesanAll/${idpesan}`, {
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

export const GetTransaksi = async (idpesan) => {
  try {
    const response = await useAxios.get(`/transaksiCetak/${idpesan}`, {
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

export const UpdatePesanan = async (id, data) => {
  try {
    const response = await useAxios.put(`/simpan/${id}`, data, {
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

export const GetMyDetailPesanan = async () => {
  const id = JSON.parse(sessionStorage.getItem("user")).id;

  try {
    const response = await useAxios.get(`/yourPesanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data.Pesanan; 
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data;
  }
};

export const sendBukti = async (value) => {
  try {
    const response = await useAxios.post(`/pesanan/bukti/${value.get("id_pesanan")}`, value, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

