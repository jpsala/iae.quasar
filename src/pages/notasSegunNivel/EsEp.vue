<template>
  <div>
    <q-table :data="data" :columns="columns" :pagination.sync="pagination"/>
    <template v-for="(c, index) in conceptual">
      <div :key="index" v-if="c !== 'Conceptual'">{{c}}</div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conceptual: undefined,
      columns: [],
      data: [],
      pagination: {
        sortBy: 'Asignatura',
        descending: false,
        page: 2,
        rowsPerPage: 0,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  props: {
    notas: undefined,
  },
  watch: {
    notas(val) {
      this.parseNotas(val);
    },
  },
  mounted() {
    if (this.notas) {
      this.parseNotas(this.notas);
    }
  },
  methods: {
    parseNotas(val) {
      const { notas } = val.data.data;
      const { periodos } = val.data.data;
      let i = 0;
      this.columns = [{ label: 'Asignatura', field: row => row[0], align: 'left' }];
      this.data = [];
      periodos.forEach((e) => {
        this.columns.push({
          label: e.nombre,
          field: row => row[i],
        });
        i += 1;
      });
      notas.forEach((e) => {
        if (e[0] === 'Conceptual') {
          this.conceptual = e;
        } else {
          this.data.push(e);
        }
      });
    },
  },
};
</script>
