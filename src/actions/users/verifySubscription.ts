"use server";
import axios from "axios";

export const fetchCustomer = async () => {
  try {
    const { data } = await axios.get("/api/customer");
    return data;
  } catch (error) {
    console.log(error);
  }
};
