<template>
    <q-card v-if="hijoActivo">
      <q-card-section>
        <img style="float:right" height="35px" src="~assets/logo_blue.png" alt="">
        <h3 style="text-align: center; margin-top: 50px">
          {{ periodo }}
        </h3>
        <div :style="{ width: width }" class="mt-3"
              style="margin: 0px auto; display:flex;justify-content: space-between;">
          <div>
            <div class="text-subtitle1"><strong>Nombre: </strong>{{ hijoActivo.nombre }}</div>
            <div class="text-subtitle1"><strong>Sección: </strong>{{ hijoActivo.seccion }}</div>
          </div>
          <!-- <div><strong>Docente:</strong>klasdfjalsdkfj</div> -->
          <div>
            <div class="text-subtitle1"><strong>Mes: {{ mes }} </strong></div>
            <div class="text-subtitle1"><strong>Ciclo Lectivo: </strong>{{ ciclo }}</div>
          </div>
        </div>
        <template v-for="(nota, index) in notasParsed">
          <template v-if="index === 0">
            <div v-if="nota[1]" :key="index"
                 style="text-align: justify; text-indent: 50px; margin-top: 20px">
                <div class="text-body1" :style="{ width: width, fontSize: fontSize }"
                     style="margin: 0 auto">
                  {{ nota[1] }}
                </div>
            </div>
          </template>
          <template v-else>
            <div v-if="nota[1]" :key="index" style="text-align: center; margin-top: 20px">
              <h4>{{ nota[0] }}</h4>
              <div :style="{fontSize: fontSize}"
                    style="text-align: justify; text-indent: 50px; margin-top: 20px">
                  <div class="text-body1" :style="{ width: width }" style="margin: 0 auto">
                    {{ nota[1] }}
                  </div>
              </div>
            </div>
          </template>
        </template>
      </q-card-section>
    </q-card>
</template>
<script>
export default {
  props: {
    notas: {
      type: [Array, Object],
      default: null,
    },
    hijoActivo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      periodo: 'Período De Inicio',
      mes: 'Abril',
      ciclo: '2019',
    };
  },
  watch: {
    hijoActivo(val) {
      console.log('val', val);
    },
  },
  computed: {
    parent() {
      console.log('parent', this.$parent);

      return this.$parent;
    },
    notasParsed() {
      console.log(this.parent);
      if (!this.notas || !this.notas.areas) return [];
      const areas = [];
      this.notas.areas.forEach((area) => {
        const areaTmp = { nombre: area.nombre, /* headers: [], */ items: [] };
        // areaTmp.headers.push({
        //   text: 'Se ha trabajado con el alumno en:',
        //   value: 'area',
        //   sortable: false,
        // });
        // area.periodos.forEach((p) => {
        //   areaTmp.headers.push({ text: p.nombre, value: p.id, sortable: false });
        // });
        // items
        area.materias.forEach((a) => {
          const item = [a.texto];
          a.periodos.forEach((p) => {
            item.push(p.texto);
          });

          // this.notasParsed.forEach(() => {
          //   item.push(a[index]);
          //   index += 1;
          // });
          areaTmp.items.push(item);
        });
        areas.push(areaTmp);
      });
      return areas[0].items;
    },
    width() {
      console.log('$q.screen', this.$q.screen);

      if (this.$q.screen.lt.sm) {
        return '95%';
      } if (this.$q.screen.md) {
        return '80%';
      } if (this.$q.screen.gt.md) {
        return '70%';
      }
      return '100%';
    },
    fontSize() {
      if (this.$q.screen.lt.sm) {
        return '100%';
      } if (this.$q.screen.md) {
        return '110%';
      } if (this.$q.screen.gt.md) {
        return '120%';
      }
      return '100%';
    },
  },
  created() {

  },
};
</script>
