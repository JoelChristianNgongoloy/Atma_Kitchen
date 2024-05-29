import useAxios from "..";

export const AmbilPenitip = async () => {
  try {
    const response = await useAxios.get("/penitip", {
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

export const CreatePenitipWE = async (data) => {
  try {
    const response = await useAxios.post("/penitip", data, {
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

export const UpdatePenitip = async (values) => {
  try {
    const response = await useAxios.put(`/penitip/${values.id}`, values, {
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

export const DeletePenitip = async (id) => {
  try {
    const response = await useAxios.delete(`/penitip/${id}`, {
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
