<template>
  <div class="q-pa-md row q-gutter-md justify-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Activación de su cuenta</div>
      </q-card-section>
      <q-separator inset />
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <q-input filled v-model="user.password" label="Contraseña *"
                  lazy-rules :rules="[
          val => val !== null && val !== '' || 'Ingrese su contraseña',
        ]" />
          <q-input filled v-model="user.password2" label="Repita su Contraseña *"
                  lazy-rules :rules="[
          val => val !== null && val !== '' || 'Repita su contraseña',
        ]" />

          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Ingresar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: undefined,
        password: '1234',
        password2: '1234',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios.post('activate', { socio_id: this.user.id, password: this.user.password })
        .then((response) => {
          if (response.data.status === 200) {
            this.$q.notify({
              color: 'primary',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Su cuenta fué activada, redireccionando a la pantalla de ingreso',
            });
            setTimeout(() => {
              this.$router.push('/login');
            }, 5000);
          }
        })
        .catch((error) => {
          console.error('e', error);
        });
    },

  },
  mounted() {
    this.user.id = this.$route.params.id;
  },
};
</script>
