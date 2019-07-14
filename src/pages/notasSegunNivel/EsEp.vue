<template>
  <div>
    <q-select  :dense="$q.screen.xs"
               v-if="$q.screen.xs && periodosParaSelect && periodosParaSelect.length > 1"
               filled v-model="periodoActivo" :options="periodosParaSelect"
    label="Período" @input="periodoActivoChange" />
    <q-table v-if="data" :data="data" hide-bottom :columns="columns"
             :pagination.sync="pagination" :visible-columns="visibleColumns"/>
    <div v-for="(conceptual, index) in conceptuales" class="q-pt-xs" :key="index">
      <h6>Nota Conceptual {{conceptual['periodo']}}</h6>
      <p class="text-body1">{{conceptual['nota']}}</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  data() {
    return {
      visibleColumns: undefined,
      periodosParaSelect: undefined,
      conceptuales: undefined,
      columns: undefined,
      data: undefined,
      periodoActivo: undefined,
      pagination: {
        page: 1,
        rowsPerPage: 0,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  props: {
    notas: undefined,
  },
  computed: {
    smallScreenChange() {
      return this.$q.screen.xs;
    },
  },
  watch: {
    notas(notas) {
      this.parseNotas(notas);
      this.setVisbleColumns();
      this.setPeriodoSelect();
    },
    smallScreenChange() {
      this.setVisbleColumns();
    },
  },
  mounted() {
    this.parseNotas(this.notas);
    this.setVisbleColumns();
    this.setPeriodoSelect();
  },
  methods: {
    setPeriodoSelect() {
      this.periodosParaSelect = [];
      this.notas.periodos.forEach((periodo) => {
        this.periodosParaSelect.push({
          value: periodo.nombre,
          label: periodo.nombre,
        });
      });
      this.periodoActivo = this.periodosParaSelect[this.periodosParaSelect.length - 1];
    },
    periodoActivoChange(periodoActivo) {
      Vue.set(this.visibleColumns, this.visibleColumns.length - 1, periodoActivo.label);
    },
    setVisbleColumns() {
      this.visibleColumns = ['asignatura'];
      if (!this.$q.screen.xs) {
        this.notas.periodos.forEach((periodo) => {
          this.visibleColumns.push(periodo.nombre);
        });
      } else {
        this.visibleColumns.push(this.notas.periodos[this.notas.periodos.length - 1].nombre);
      }
    },
    parseNotas(notasYPeriodos) {
      const { periodos } = notasYPeriodos;
      this.data = notasYPeriodos.notas;
      this.conceptuales = notasYPeriodos.conceptuales;
      console.log('notasYPeriodos', notasYPeriodos);

      // creo las columnas
      this.columns = [{
        label: 'Asignatura', field: 'asignatura', align: 'left', name: 'asignatura',
      }];
      periodos.forEach((periodo) => {
        this.columns.push({
          label: periodo.nombre,
          field: row => row.nota[periodo.nombre],
          name: periodo.nombre,
        });
      });
    },
  },
};
</script>
