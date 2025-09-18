<template>
  <a-col :xs="24" :sm="12" :md="8" :lg="6" class="card-col">
    <div class="card-container">
      <div class="card-tag tag-info">实用工具</div>
      <a-card hoverable>
        <img :src="cover" alt="Card cover" slot="cover" class="reset-height" />
        <template v-slot:actions>
          <a :href="link" target="_blank" rel="noopener noreferrer">
            <a-button type="primary" icon="github" ghost>传送门</a-button>
          </a>
        </template>
        <a-card-meta :title="title" :description="author"></a-card-meta>
      </a-card>
    </div>
  </a-col>
</template>

<script>
export default {
  name: "Card",
  props: {
    cover: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.card-container {
  position: relative;
}

.card-tag {
  position: absolute;
  padding: 4px 10px;
  border-radius: 50px 0 0 50px;
  right: 0;
  top: 15px;
  z-index: 20;
  text-align: center;
  user-select: none;
  background: #fff7e6;
  border: 1px solid #ffd591;
  color: #fa8c16;
}

.reset-height {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

.card-col {
  margin-bottom: 24px;
}
</style>
