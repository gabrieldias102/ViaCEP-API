import axios from "axios";
import type { Address } from "../types/address";

export const cepService = {
  async fetchAddress(cep: string): Promise<Address> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  },
};
