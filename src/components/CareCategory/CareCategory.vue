<template>
  <div id="care-category">
    <h3>{{ careCategoryName }} Json Config</h3>
    <!-- <pre>{{ careCategoryData }}</pre> -->
    <Table
      v-if="gridData && gridData.length"
      :data="gridData"
      :columns="gridColumns"
      @update-config="save"
    />
    <div>
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
          field: 'displayablename'
        },
        {
          name: 'Order',
          field: 'testorder'
        },
        {
          name: 'Primary',
          field: 'isprimary'
        },
        {
          name: 'Prescription Data',
          field: 'isprescriptiondata'
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
    save (data) {
      this.$emit('update-care-category', this.careCategoryData)
    }
  },
  template: '#care-category'
}
</script>
