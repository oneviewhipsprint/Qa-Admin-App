<template>
  <div class="full-width center-content">
    <div class="pc-tab">
      <input
        id="tab1"
        checked="checked"
        type="radio"
        name="pct"
      >
      <input
        id="tab2"
        type="radio"
        name="pct"
      >
      <input
        id="tab3"
        type="radio"
        name="pct"
      >
      <nav>
        <ul>
          <li class="tab1">
            <label for="tab1">
              BP and Fluids
            </label>
          </li>
          <li class="tab2">
            <label for="tab2">
              Anemia
            </label>
          </li>
          <li class="tab3">
            <label for="tab3">
              Adequacy
            </label>
          </li>
        </ul>
      </nav>
      <section>
        <div class="tab1">
          <CareCategory
            care-category-name="Bp and Fluids"
            :care-category-data="response"
            :message="message"
            @update-cart="updateCart"
          />
        </div>
        <div class="tab2">
          <h2>Anemia</h2>
          <p>Currently no data</p>
        </div>
        <div class="tab3">
          <h2>Adequacy</h2>
          <p>Currently no data</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CareCategory from 'components/CareCategory/CareCategory'
import axios from 'axios'

export default {
  components: {
    CareCategory
  },
  data () {
    return {
      response: {},
      message: ''
    }
  },
  created () {
    this.getJsonConfigData()
  },
  methods: {
    getJsonConfigData () {
      axios({ method: 'GET',
        'url': '/api/patients/get-configs',
        'headers': { 'content-type': 'application/json' } }).then(result => {
        this.response = result.data
      }, error => {
        console.error(error)
      })
    },
    updateCart (data) {
      console.log('working' + data)
      axios({ method: 'POST',
        url: '/api/patients/save-configs',
        headers: { 'content-type': 'application/json' },
        data: data }).then(result => {
        if (result && result.status === 200) {
          this.message = 'Saved successfully!!'
        } else {
          this.message = 'Error occurred while saving, please try again later.'
        }
      }, error => {
        this.message = 'Error occurred while saving, please try again later.'
        console.error(error)
      })
    }
  }
}
</script>
