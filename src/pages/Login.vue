<template>
  <div class="q-pa-md row q-gutter-md justify-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Ingreso al IAE</div>
      </q-card-section>
      <q-separator inset />
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <q-input filled v-model="user.email" label="Dirección de correo *" lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su correo']" />

          <q-input filled type="password" v-model="user.password" label="Contraseña *"
                  lazy-rules :rules="[
          val => val !== null && val !== '' || 'Ingrese su contraseña',
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        email: 'jpsala@gmail.com',
        password: 'masterPassword',
        saveCredentials: 'false',
      },
    };
  },

  methods: {
    ...mapActions('session', ['login', 'logout']),
    onSubmit() {
      this.login(this.user).then((data) => {
        console.log('data', data);

        if (data.status !== 200) {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Error de ingreso: ${data.statusMsj}`,
          });
        } else {
          this.$router.push('/');
        }
      });
    },

    onReset() {
      this.email = null;
      this.password = null;
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
