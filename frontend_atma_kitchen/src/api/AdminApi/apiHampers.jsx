import useAxios from "..";

export const CreateHampersWE = async (data) => {
  try {
    const response = await useAxios.post("/hampers", data, {
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

export const GetAllHampers = async () => {
  try {
    const response = await useAxios.get("/hampers", {
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

export const GetAllProdukH = async () => {
  try {
    const response = await useAxios.get("/produk", {
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

export const DeleteHampers = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/hampers/${id}`, {
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

export const UpdateHampers = async (values) => {
  try {
    const response = await useAxios.put(`/hampers/${values.id}`, values, {
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
