import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // depois ajustamos se precisar
});

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};