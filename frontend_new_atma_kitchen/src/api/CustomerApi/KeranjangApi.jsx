import useAxios from "..";

export const GetMyProduk = async () => {
  const id = JSON.parse(sessionStorage.getItem("user")).id;

  try {
    const response = await useAxios.get(`/keranjang/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data;
  }
};

export const createKeranjangWE = async (data) => {
  try {
    const response = await useAxios.post("/keranjang", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createPesananKeranjang = async (data) => {
  try {
    const response = await useAxios.post("/pesananKeranjang", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
