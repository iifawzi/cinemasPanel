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
      <td>
        <div class="actions">
        <action action="show" icon="fas fa-info-circle"/>
        <action action="edit" icon="far fa-edit"/>
        <action action="delete" icon="far fa-trash-alt"/>
        </div>
        </td>
    </tr>
     <tr>
      <td>2</td>
      <td>Al-Forsan</td>
      <td><status value="Close" status="close"/></td>
      <td> 
        <div class="actions">
        <action action="show" icon="fas fa-info-circle"/>
        <action action="edit" icon="far fa-edit"/>
        <action action="delete" icon="far fa-trash-alt"/>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import status from "~/components/shared/status"
import action from "~/components/shared/action"
export default {
    computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    },
    components: {
      status,
      action
    }
}
</script>

<style lang="scss" src="./style.scss" scoped />