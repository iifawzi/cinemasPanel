<template>
  <table :class="['modernTable', language === 'en' ? 'left' : 'right']">
    <tr>
      <th class="number"># <i class="fas fa-arrow-up arrow"></i></th>
      <th>Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
    <tr>
      <td>1</td>
      <td>Al-Forsan</td>
      <td><status value="Open" status="open"/></td>
      <td>bla bla</td>
    </tr>
     <tr>
      <td>2</td>
      <td>Al-Forsan</td>
      <td><status value="Close" status="close"/></td>
      <td>bla bla</td>
    </tr>
  </table>
</template>

<script>
import status from "~/components/shared/status"
export default {
    computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    },
    components: {
      status,
    }
}
</script>

<style lang="scss" src="./style.scss" scoped />