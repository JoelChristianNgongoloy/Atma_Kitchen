import useAxios from "..";

export const GetAllPenarikan = async () => {
    try {
      const response = await useAxios.get("/saldo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data.data; // Sesuaikan dengan struktur respons dari backend
    } catch (error) {
      throw error.response.data; // Melempar pesan kesalahan dari respons API
    }
};

export const KonfirmPenarikan = async (id) => {
    try {
      const response = await useAxios.put(`/saldo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data.data; // Sesuaikan dengan struktur respons dari backend
    } catch (error) {
      throw error.response.data; // Melempar pesan kesalahan dari respons API
    }
}