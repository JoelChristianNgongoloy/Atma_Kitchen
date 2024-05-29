import useAxios from "../..";

export const GetProdukKue = async () => {
  try {
    const response = await useAxios.get("/produkCake", {
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

export const GetProdukRoti = async () => {
  try {
    const response = await useAxios.get("/produkRoti", {
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

export const GetProdukMinuman = async () => {
  try {
    const response = await useAxios.get("/produkMinuman", {
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
