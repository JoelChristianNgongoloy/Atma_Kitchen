import useAxios from ".";

const AuthRegister = async (data) => {
  try {
    const response = await useAxios.post("/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export { AuthRegister };

const AuthLogin = async (data) => {
  try {
    const response = await useAxios.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export { AuthLogin };
