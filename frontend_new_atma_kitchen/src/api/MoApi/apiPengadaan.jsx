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
