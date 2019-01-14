<template>
  <div id="care-category">
    <h3>{{ careCategoryName }} Json Config</h3>
    <!-- <pre>{{ careCategoryData }}</pre> -->
    <Table
      v-if="gridData && gridData.length"
      :data="gridData"
      :columns="gridColumns"
    />
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
import Table from '../table/Table.vue'
export default {
  name: 'CareCategory',
  components: {
    Table
  },
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
  data: function () {
    return {
      gridColumns: [
        {
          name: 'Name',
          field: 'displayableName'
        },
        {
          name: 'Order',
          field: 'order'
        },
        {
          name: 'Primary',
          field: 'isPrimary'
        },
        {
          name: 'Prescription Data',
          field: 'isPrescriptionData'
        }
      ]
    }
  },
  computed: {
    gridData: function () {
      let tableData = []
      for (const key in this.careCategoryData) {
        tableData.push(this.careCategoryData[key])
      }

      tableData = tableData.sort((a, b) => {
        return (a.order > b.order) ? 1 : -1
      })
      return tableData
    }
  },
  methods: {
    click () {
      this.$emit('update-cart', this.careCategoryData)
    }
  },
  template: '#care-category'
}
</script>
