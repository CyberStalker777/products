import { createRouter, createWebHistory } from "vue-router";

import ProductCard from "../pages/ProductCard.vue";
import ProductInfo from "../pages/ProductInfo.vue";


export const routers = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "ProductCardPage", component: ProductCard },
    { path: "/:id", name: "ProductInfoPage", component: ProductInfo },
  ],
});