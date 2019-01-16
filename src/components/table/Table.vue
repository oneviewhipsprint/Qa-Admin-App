<template>
  <div id="table-component">
    <table>
      <thead>
        <tr>
          <th
            v-for="(col, index) in tableCol"
            :key="index"
          >
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in tableData"
          :key="index"
        >
          <td
            v-for="(col, idx) in tableCol"
            :key="idx"
          >
            <div v-if="!col.editable">
              {{ item[col.field] }}
            </div>
            <div
              v-if="col.editable"
              class="editable-ele"
            >
              <input
                v-model="item[col.field]"
                type="text"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="btn-save"
      @click="saveOrder"
    >
      Update Config
    </button>
    <button
      class="btn-save"
      @click="convertTableEditable"
    >
      {{ editBtn }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data: function () {
    console.log(this.data)
    return {
      tableData: this.data,
      tableCol: this.columns,
      editBtn: 'Edit',
      isEdit: false
    }
  },
  methods: {
    saveOrder: function () {
      this.convertTableEditable()
      this.$emit('update-config', this.tableData)
    },
    convertTableEditable: function () {
      this.isEdit = !this.isEdit
      const columns = this.tableCol
      this.editBtn = this.isEdit ? 'Cancel' : 'Edit'
      for (let i = 0; i < columns.length; i++) {
        const item = columns[i]
        item.editable = !item.editable
      }
      this.tableCol = [].concat(columns)
    }
  },
  template: '#table-component'
}
</script>
<style lang="css" scoped>
  @import './table.style.css'
</style>
