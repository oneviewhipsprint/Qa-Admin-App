<template>
  <div>
    <h3>{{ careCategoryName }} Json Config</h3>
    <pre>{{ careCategoryData }}</pre>
    <div>
      <button
        class="btn-save"
        @click="click"
      >
        Save
      </button>
      <span
        v-if="message"
        class="alert-success"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    careCategoryName: {
      type: String,
      required: true
    },
    careCategoryData: {
      type: Object,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    click () {
      this.$emit('update-cart', this.careCategoryData)
    }
  }
}
</script>
