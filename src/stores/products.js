import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    id: null,
  }),
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(`https://dummyjson.com/products/?&limit=100`);
        this.products = response.data.products;
      } catch (error) {
        console.error(error);
      }
    },
  },
});



