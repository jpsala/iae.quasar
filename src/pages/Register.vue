<template>
  <div class="q-pa-md row q-guttter-md q-gutter-y-md justify-center">
    <my-spinner  v-if="loading" />
    <div class="doc-note doc-note--tip">
        Ingrese la dirección de correo que está registrada en el IAE y el sistema le enviará
        un correo con un link para activar su cuenta.
    </div>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Se está registrando en el IAE</div>
      </q-card-section>
      <!-- <q-separator inset /> -->
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <q-input v-model="user.email" label="Dirección de correo *"
                  lazy-rules :rules="[ val => val && val.length > 0 || 'Ingrese su correo']" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Registro" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import mySpinner from 'app/src/components/MySpinner';

export default {
  components: { mySpinner },
  data() {
    return {
      loading: false,
      user: {
        email: 'jpsala@gmail.com',
        saveCredentials: 'false',
      },
    };
  },

  methods: {
    ...mapActions('session', ['login', 'logout']),
    onSubmit() {
      // commit('addLoadingIndicator', 'main', { root: true });
      // { method: 'POST', body: JSON.stringify({ socio_id: state.hijoActivo.id }) }
      this.loading = true;
      this.$axios
        .post('register', this.user)
        .then((response) => {
          this.loading = false;
          const { status } = response.data;
          if (status === 200) {
            this.$q.notify({
              color: 'primary',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Recibirá un correo con un link de activación',
            });
            setTimeout(() => {
              this.$router.push('/login');
            }, 5000);
          }
          console.log(status);
        })
        .catch((e) => {
          this.loading = false;

          throw e;
        });
    },
    onReset() {
      this.email = null;
      this.accept = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.my-card {
  @media (max-width: $breakpoint-xs-max) {
    width: 100%;
    max-width: 450px;
    min-width: 350px;
  }
  @media (min-width: $breakpoint-sm-min) {
    width: 450px;
  }
  font-size: 10px;
}
</style>
