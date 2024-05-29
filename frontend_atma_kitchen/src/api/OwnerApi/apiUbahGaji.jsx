import useAxios from "..";

export const GetAllPegawaiByOwner = async () => {
  try {
    const response = await useAxios.get("/pegawaiOwner", {
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

export const UpdateGaji = async (values) => {
  try {
    const response = await useAxios.put(`/pegawaiOwner/${values.id}`, values, {
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
