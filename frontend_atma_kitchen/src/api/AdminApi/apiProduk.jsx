import useAxios from "..";

export const GetAllProduk = async () => {
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
  
  export const GetAllProdukPenitip = async () => {
    try {
      const response = await useAxios.get("/produkPenitip", {
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
  
  export const CreateProdukWE = async (data) => {
    try {
      const response = await useAxios.post("/produk", data, {
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
  
  export const UpdateProduk = async (values) => {
    try {
      const response = await useAxios.put(`/produk/${values.id}`, values, {
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
  
  export const DeleteProduk = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await useAxios.delete(`/produk/${id}`, {
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
  
  export const CreateProdukPenitip = async (data) => {
    try {
      const response = await useAxios.post("/produkPenitip", data, {
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
  
  export const GetAllPenitip = async () => {
    try {
      const response = await useAxios.get("/penitipByAdmin", {
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
  