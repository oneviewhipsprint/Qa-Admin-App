<template>
  <div>
    <h3>{{ careCategoryName }} Json Config</h3>
    <pre>{{ careCategoryData }}</pre>
    <Table
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
      console.log(this)

      let tableData = []
      for (const key in this.careCategoryData) {
        tableData.push(this.careCategoryData[key])
      }

      tableData = tableData.sort((a, b) => {
        return (a.order > b.order) ? 1 : -1
      })

      console.log(tableData)

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
        ],
        gridData: tableData
      }
    },
    watch: {
      careCategoryData: function (newVal, oldVal) {
        console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        let tableData = []
        for (const key in this.careCategoryData) {
          tableData.push(this.careCategoryData[key])
        }

        tableData = tableData.sort((a, b) => {
          return (a.order > b.order) ? 1 : -1
        })
        this.$emit('update:data', this.careCategoryData)
      }
    }
  }
  methods: {
    click () {
      this.$emit('update-cart', this.careCategoryData)
    }
  }
}
</script>
