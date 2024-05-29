import useAxios from "../..";

export const GetProdukWithKuota = async (idProduk) => {
  try {
    const response = await useAxios.get(`/informationprodukdate/${idProduk}`, {
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

export const GetProdukWithKuotathen = async (idProduk) => {
  try {
    const response = await useAxios.get(
      `/informationprodukdatethen/${idProduk}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetProdukWithKuotabesok = async (idProduk) => {
  try {
    const response = await useAxios.get(
      `/informationprodukdatebesok/${idProduk}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetJustProduk = async (idProduk) => {
  try {
    const response = await useAxios.get(`/informationproduk/${idProduk}`, {
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

export const CreatePesananWE = async (data) => {
  try {
    const response = await useAxios.post("/pesanan", data, {
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

export const CreateAlamatPesanan = async (id, data) => {
  try {
    const response = await useAxios.put(`/alamatInput/${id}`, data, {
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
