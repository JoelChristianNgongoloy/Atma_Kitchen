import useAxios from "..";

export const GetAllPencatatanBahanOwner = async () => {
  try {
    const response = await useAxios.get("/laporanBahanOwner", {
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

export const GetTampilPesananByBulanOwner = async (data) => {
    try {
      const response = await useAxios.post("/cetakPesananOwner", data, {
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
