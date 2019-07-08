<template>
  <q-spinner-puff class="loading" color="primary" size="3.5em"/>
</template>
<script>
export default {

};
</script>
<style>
.loading2{
  position: fixed;
  z-index: 999;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: red;
}
.loading {
  position: absolute;
  top: 24vw;
  left: 48%;
  z-index: 1000;
}
</style>
