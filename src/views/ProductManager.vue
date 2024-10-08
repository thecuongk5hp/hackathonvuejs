<template>
  <div class="product-manager">
    <div class="header d-flex justify-content-between mb-2">
      <div>
        <input
          type="text"
          v-model="search"
          placeholder="Tìm kiếm sản phẩm theo tên"
          class="search-input p-1"
        />
        <button
          type="button"
          class="btn btn-primary"
          @click="resetForm"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        >
          Add New Product
        </button>
      </div>
    </div>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="product.image"
              alt="product image"
              class="product-image"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button
              class="btn btn-warning me-2"
              @click="handleEditProduct(product.id)"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
            >
              Edit
            </button>
            <button class="btn btn-danger" @click="handleDelete(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="productModalLabel">
              {{ isEdit ? "Edit Product" : "Add Product" }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleCreateOrUpdate">
              <div class="mb-3">
                <label for="productName" class="form-label">Name:</label>
                <input
                  id="productName"
                  type="text"
                  v-model="dataProduct.name"
                  required
                  class="form-control"
                />
                <p v-if="errorName" class="text-danger">Name không hợp lệ</p>
              </div>

              <div class="mb-3">
                <label for="productImage" class="form-label">Image:</label>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                  required
                  class="form-control"
                />
                <p v-if="errorImage" class="text-danger">Image không hợp lệ</p>
                <img
                  v-if="dataProduct.image"
                  :src="dataProduct.image"
                  alt="Preview"
                  class="image-preview mt-2"
                />
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Price:</label>
                <input
                  id="productPrice"
                  type="number"
                  v-model="dataProduct.price"
                  min="10000"
                  required
                  class="form-control"
                />
                <p v-if="errorPrice" class="text-danger">
                  Giá tối thiểu là 10.000đ
                </p>
              </div>

              <div class="mb-3">
                <label for="productQuantity" class="form-label"
                  >Quantity:</label
                >
                <input
                  id="productQuantity"
                  type="number"
                  v-model="dataProduct.quantity"
                  min="1"
                  max="100"
                  required
                  class="form-control"
                />
                <p v-if="errorQuantity" class="text-danger">
                  Số lượng từ 1 đến 100
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const products = ref(JSON.parse(localStorage.getItem("products")) || []);
const dataProduct = ref({
  id: null,
  name: "",
  image: "",
  price: null,
  quantity: null,
});
const errorName = ref(false);
const errorImage = ref(false);
const errorPrice = ref(false);
const errorQuantity = ref(false);
const isEdit = ref(false);
const search = ref("");

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
const resetForm = () => {
  dataProduct.value = {
    id: null,
    name: "",
    image: "",
    price: null,
    quantity: null,
  };
  isEdit.value = false;
  errorName.value = false;
  errorImage.value = false;
  errorPrice.value = false;
  errorQuantity.value = false;
};
const handleEditProduct = (id) => {
  const productEdit = products.value.find((product) => product.id === id);
  if (productEdit) {
    dataProduct.value = { ...productEdit };
    isEdit.value = true;
  }
};
const handleCreateOrUpdate = () => {
  errorName.value = !dataProduct.value.name;
  errorImage.value = !dataProduct.value.image;
  errorPrice.value = dataProduct.value.price < 10000;
  errorQuantity.value =
    dataProduct.value.quantity < 1 || dataProduct.value.quantity > 100;

  if (
    errorName.value ||
    errorImage.value ||
    errorPrice.value ||
    errorQuantity.value
  ) {
    return; 
  }
  if (isEdit.value) {
    const index = products.value.findIndex(
      (product) => product.id === dataProduct.value.id
    );
    if (index !== -1) {
      products.value[index] = { ...dataProduct.value }; 
    }
  } else {
    dataProduct.value.id = Date.now(); 
    products.value.push({ ...dataProduct.value }); 
  }
  localStorage.setItem("products", JSON.stringify(products.value)); 
  resetForm(); 
  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.hide();
};
const handleDelete = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    products.value = products.value.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products.value)); 
  }
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      dataProduct.value.image = e.target.result; 
      errorImage.value = false; 
    };
    reader.readAsDataURL(file); 
  }
};
</script>
<style scoped>
.product-manager {
  margin: 20px;
}
.header {
  margin-bottom: 20px;
}
.search-input {
  margin-right: 10px;
}
.table {
  margin-top: 20px;
}
.product-image {
  width: 50px;
  height: auto;
}
.image-preview {
  width: 100px;
  height: auto;
  margin-top: 10px;
}
.text-danger {
  font-size: 0.9em;
}
</style>
