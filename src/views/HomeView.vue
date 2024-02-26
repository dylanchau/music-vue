<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <!-- Introducting Heading -->
          <h1 class="font-bold text-5xl mb-5">Hello</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>
      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <!-- <div
          class="px-5 pt-4 pb-4 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">Songs</span>
          
        </div> -->

        <div class="card">
          <DataView :value="products">
            <template #list="slotProps">
              <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                  <div
                    class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                    :class="{ 'border-top-1 surface-border': index !== 0 }"
                  >
                    <div class="md:w-10rem relative">
                      <img
                        class="block xl:block mx-auto border-round w-full"
                        :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                        :alt="item.name"
                      />
                      <Tag
                        :value="item.inventoryStatus"
                        :severity="getSeverity(item)"
                        class="absolute"
                        style="left: 4px; top: 4px"
                      ></Tag>
                    </div>
                    <div
                      class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
                    >
                      <div
                        class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                      >
                        <div>
                          <span class="font-medium text-secondary text-sm">{{
                            item.category
                          }}</span>
                          <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                        </div>
                        <div class="surface-100 p-1" style="border-radius: 30px">
                          <div
                            class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                            style="
                              border-radius: 30px;
                              box-shadow:
                                0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                            "
                          >
                            <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-column md:align-items-end gap-5">
                        <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                          <Button icon="pi pi-heart" outlined></Button>
                          <Button
                            icon="pi pi-shopping-cart"
                            label="Buy Now"
                            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                            class="flex-auto md:flex-initial white-space-nowrap"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </div>

        <!-- Playlist -->
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ProductService } from '@/service/ProductService'

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 5)))
})

const products = ref()
const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
</script>
