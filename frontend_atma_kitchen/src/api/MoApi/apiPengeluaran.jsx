import useAxios from "..";

export const GetAllPengeluaran = async () => {
  try {
    const response = await useAxios.get("/pengeluaran", {
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

export const CreatePengeluaranWE = async (data) => {
  try {
    const response = await useAxios.post("/pengeluaran", data, {
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

export const UpdatePengeluaran = async (values) => {
  try {
    const response = await useAxios.put(`/pengeluaran/${values.id}`, values, {
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

export const DeletePengeluaran = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/pengeluaran/${id}`, {
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
