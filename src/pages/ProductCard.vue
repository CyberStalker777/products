<template>
  <div class="container">
    <div class="sort">
      <button @click="sortType = 'count'">Сортировка по Кол-во</button>
      <button @click="sortType = 'price'">Сортировка по Цене</button>
      <button @click="sortDirection = sortDirection === 'asc' ? 'desc' : 'asc' ">Изменить направление сортировки</button>

      <select v-model="selectedCategory" class="sort__drop" @click.stop="" @click="add = !add" :class="{active: add}">
        <option value="">Все категории</option>
        <option v-for="cat in categories" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="product__cards">
      <div class="product__card" v-for="product in paginatedProducts" :key="product.id">
        <RouterLink :to="`/${product.id}`" @click="openProduct(product.id)">
          <img :src="product.thumbnail" alt="" />
        </RouterLink>
        <h1 class="product__card-title">{{ product.brand }}</h1>
        <p class="product__card-description">{{ product.description }}</p>
        <p class="product__card-price">Цена: ${{ product.price }}</p>
        <p class="product__card-count">Кол-во: {{ product.stock }}</p>
        <p class="product__card-discount">Скидка: ${{ product.discountPercentage }}</p>
      </div>
    </div>

    <div class="v-table__pagination">
      <button class="page" :disabled="currentPage === 1" :class="{ 'disabled': currentPage === 1 }" @click="loadLess()">←</button>
      <button v-if="windowWidth > 750" class="page" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="pageClick(page)">
        {{ page }}
      </button>
      <button v-else class="page" :class="{ active: page === currentPage }" @click="pageClick(page)">
        {{ currentPage }}
      </button>
      <button class="page" :disabled="currentPage === totalPages" :class="{ 'disabled': currentPage === totalPages }" @click="loadMore()">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import { useProductStore } from "../stores/products.js";
const productStore = useProductStore();
productStore.getProducts();

const sortType = ref("");
let sortDirection = ref("asc");
const windowWidth = ref(window.innerWidth);
let add = ref(false)


const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
        document.addEventListener('click', toggleAdd);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });
    
    const toggleAdd = () => {
      add.value = false;
  };



const selectedCategory = ref(""); // Выбранная категория
const categories = computed(() => {
  const allCategories = productStore.products.map(product => product.category);
  return [...new Set(allCategories)];
});


const sortedProducts = computed(() => {
  const products = productStore.products.slice();
  let filteredProducts = products;

  if (selectedCategory.value !== "") {
    filteredProducts = products.filter(product => product.category === selectedCategory.value);
  }

  if (sortType.value === "count") {
    return products.sort((a, b) => {
      return sortDirection.value === "asc" ? a.stock - b.stock : b.stock - a.stock;
    });
    
  } else if (sortType.value === "price") {
    return products.sort((a, b) => {
      return sortDirection.value === "asc" ? a.price - b.price : b.price - a.price;
    });
  }
  
  return filteredProducts;
});



const productPerPage = ref(12);
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / productPerPage.value));

const paginatedProducts = computed(() => {
  const from = (currentPage.value - 1) * productPerPage.value;
  const to = from + productPerPage.value;
  return sortedProducts.value.slice(from, to);
});

function pageClick(page) {
  currentPage.value = page;
}

function openProduct(id) {
  productStore.id = id;
}

function loadMore() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function loadLess() {
  if (currentPage.value > 1) {
      currentPage.value--;
  }
}
</script>