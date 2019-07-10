<template>
  <div>
    <template v-for="(item, index) in items">
      <template v-if="protectedItem(item)">
        <q-item v-if="!item.items" :key="index" :inset-level="item.level" :to="item.to"
                @click.native="exec(item)" style="cursor: pointer">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{item.label}}</q-item-section>
        </q-item>
        <q-expansion-item v-if="item.items" :key="index" :icon="item.icon" :label="item.label"
                          :default-opened="false" :group="item.group"
                          :header-inset-level="item.icon ? item.level : item.level + 1">
          <my-drawer :items="item.items" />
        </q-expansion-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'myDrawer',
  props: {
    items: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    protectedItem(item) {
      return !item.protected || (item.protected && this.$store.getters['session/loggedIn']);
    },
    exec(e) {
      if (e.exec) {
        e.exec();
      }
    },
  },
};
</script>
