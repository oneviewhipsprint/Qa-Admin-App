<template>
  <div id="table-component">
    <button @click="saveOrder">
      Update
    </button>
    <button @click="convertTableEditable">
      Edit Table
    </button>
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
      tableCol: this.columns
    }
  },
  methods: {
    saveOrder: function () {
      const sortedData = this.tableData.sort((a, b) => {
        return (a.order > b.order) ? 1 : -1
      })

      this.tableData = [].concat(sortedData)
    },
    convertTableEditable: function () {
      const columns = this.tableCol
      for (let i = 0; i < columns.length; i++) {
        const item = columns[i]
        if (item.field === 'order') {
          item.editable = !item.editable
          break
        }
      }
      this.tableCol = [].concat(columns)
    }
  },
  template: '#table-component'
}
</script>