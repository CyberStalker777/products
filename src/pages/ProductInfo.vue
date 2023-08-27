<template>
  <div>
    <div class="product__card card">
      <img :src="getProduct().thumbnail" alt="" />
      <h1 class="product__card-title">{{ getProduct().brand }}</h1>
      <p class="product__card-description">{{ getProduct().description }}</p>
      <p class="product__card-price">Цена: ${{ getProduct().price }}</p>
      <p class="product__card-count">Кол-во: {{ getProduct().stock }}</p>
      <p class="product__card-discount">Скидка: ${{ getProduct().discountPercentage }}</p>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/products.js";
const productStore = useProductStore();


function getProduct() {                
    return productStore.products.find((product) => product.id === productStore.id);
}


console.log(getProduct());

</script>





