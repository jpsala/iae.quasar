<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click.stop="left = !left" />
        <q-toolbar-title>
          <q-avatar style="width: 55px">
            <img src="~assets/logo_white.png">
          </q-avatar>
          <div class="col"></div>
        </q-toolbar-title>
        <q-btn v-if="!loggedIn" @click="login()" flat>Ingresar</q-btn>
        <q-btn v-if="!loggedIn" @click="register()" flat>Registrarse</q-btn>
        <q-btn v-if="loggedIn" @click="logout()" flat>Salir</q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer :breakpoint="900" v-model="left" side="left" bordered>
      <q-list class="rounded-borders">
        <my-drawer-content :left.sync="left" :items='items' />
        <q-item v-if="this.$store.getters['session/loggedIn']" exact @click.native="logout()"
                style="cursor: pointer">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>Salir</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar style="width: 55px">
            <img src="../assets/logo_blue.png">
          </q-avatar> -->
        </q-toolbar-title>
        jpsala@iae.com.ar
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import myDrawerContent from 'app/src/components/MyDrawerContent';
import { mapGetters } from 'vuex';

function setItemsDefaults(items, level = 0) {
  items.forEach((e) => {
    if (e.protected === undefined) e.protected = false;
    e.level = level;
    // if (level === 0) e.group = 'uno';
    e.group = String(level);
    if (e.items) {
      level += 0.3;
      e.items = setItemsDefaults(e.items, level);
      level -= 0.3;
    }
  });
  return items;
}
export default {
  components: { myDrawerContent },
  data() {
    return {
      left: true,
      items: setItemsDefaults([
        // Contratos
        {
          label: 'Contratos',
          icon: 'receipt',
          items: [
            {
              label: 'Pedagógico',
              icon: 'school',
              items: [
                {
                  label: 'Inicial',
                  // icon: 'school',
                  to: '/contrato/inicial',
                },
                {
                  label: 'Primaria',
                  to: '/contrato/ep',
                  // icon: 'school',
                },
                {
                  label: 'Secundaria',
                  // icon: 'school',
                  items: [
                    {
                      label: 'Primer Año',
                      to: '/contrato/es1',
                      // icon: 'school',
                    },
                    {
                      to: '/contrato/es2a6',
                      label: 'Otros Años',
                      // icon: 'school',
                    },
                  ],
                },
              ],
            },
            {
              label: 'Administrativo',
              to: '/contrato/admin',
              icon: 'receipt',
            },
            {
              label: 'Anexo',
              icon: 'input',
              to: '/contrato/anexo',
            },
            {
              label: 'Misión y Visión',
              icon: 'favorite_border',
              to: '/contrato/mision',
            },
          ],
        },
        // Educativo
        {
          label: 'Educativo',
          icon: 'school',
          protected: true,
          items: [
            {
              label: 'Notas',
              icon: 'create',
              to: '/notas',
            },
            {
              label: 'Talleres',
              icon: 'party_mode',
            },
          ],
        },
        // Administrativo
        {
          label: 'Administrativo',
          icon: 'credit_card',
          protected: true,
          items: [
            {
              label: 'Estado de Cuenta',
              icon: 'print',
            },
          ],
        },
      ]),
    };
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
  },
  mounted() {},
  methods: {
    login() {
      this.$router.replace('/login');
    },
    register() {
      this.$router.replace('/register');
    },
    logout() {
      this.$store.dispatch('session/logout');
      this.$router.replace('/login');
    },
  },
};
</script>
