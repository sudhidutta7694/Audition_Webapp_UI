<template>
  <div class="table-container">
    <div class="table-header">
      <v-list-item three-line>
      <v-list-item-content style="height:50px">
        <div class="text-overline mb-4">
          <div class="pointer"></div> ROUND RESULTS
        </div>
      </v-list-item-content>
      </v-list-item>
    </div>
    <v-data-table
      style="background-color: #1A1D1F; width:95%;"
      :headers="headers"
      :items="desserts"
      :options.sync="options"
      :server-items-length="totalDesserts"
      :loading="loading"
      class="elevation-1 ma-5 mt-0 px-5"
      :disable-pagination="true"
    ></v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        options: {},
        headers: [
          {
            text: 'Round',
            align: 'start',
            sortable: false,
            value: 'round',
          },
          { text: 'Result', value: 'result' },
          { text: 'Feedback', value: 'feedback' }
        ],
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.fakeApiCall().then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
          this.loading = false
        })
      },
      /**
       * In a real application this would be a call to fetch() or axios.get()
       */
      fakeApiCall () {
        return new Promise((resolve) => {
          const { sortBy, sortDesc, page, itemsPerPage } = this.options

          let items = this.getDesserts()
          const total = items.length

          if (sortBy.length === 1 && sortDesc.length === 1) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      },
      getDesserts () {
        return [
          {
            round: 1,
            result: 'Qualified',
            feedback: null
          },
          {
            round: 2,
            result: 'Qualified',
            feedback: null
          },
          {
            round: 3,
            result: 'Under Review',
            feedback: 'Do better'
          },          
        ]
      },
    },
  }
</script>

<style scoped>
.table-header{
  /* border: 2px solid red; */
  background-color: #111315;
  border-radius: 10px;
  margin: 30px;
  width: 95%;
}
.text-overline{
  display: flex;
  align-items: center;
}
.pointer{
  background-color: #a692ff;
  width: 10px;
  height: 15px;
  border-radius: 10px;
  margin-right: 8px;
}
.table-container{
    /* border: 2px solid red; */
    margin-top: 50px;
    width: 82.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1A1D1F;
    border-radius: 10px;
}
.table{
  background-color: red;
}
</style>