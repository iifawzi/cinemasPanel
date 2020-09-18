<template>
  <div class="addhall">
    <pageInfo :title="$t('pages.halls.title')" :desc="$t('pages.halls.desc')" />
    <div class="content">
      <div class="hallsTable">
        <modernTable apiURL="halls/">
          <template v-slot:table__head>
            <th class="number">
              #
              <i class="fas fa-arrow-up arrow"></i>
            </th>
            <th>{{$t('general.name')}}</th>
            <th>{{$t('general.status')}}</th>
            <th>{{$t('general.actions')}}</th>
          </template>
          <template v-slot:table__data>
            <tr v-for="(hall, i) of halls" :key="hall.id">
              <td>{{i+1}}</td>
              <td>{{hall.hall_name}}</td>
              <td>
                <status :value="hall.hall_status === true ? $t('general.open') : $t('general.close')" :status="hall.hall_status === true ? 'open' : 'close'" />
              </td>
              <td>
                <div class="actions">
                  <action action="show" icon="far fa-edit" />
                  <action action="delete" icon="far fa-trash-alt" />
                </div>
              </td>
            </tr>
          </template>
        </modernTable>
      </div>
    </div>
  </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo";
import modernTable from "~/components/shared/modernTable";
import action from "~/components/shared/action";
import status from "~/components/shared/status";
import handle from "~/helpers/handle.js";
export default {
  async mounted(){
    const [halls,halls_error] = await handle(this.$api.get("halls/"));
    this.halls = halls.data.data;
    console.log(this.halls);
  },  
  head() {
    return {
      title: "Halls",
    };
  },
  layout: "dashboard",
  components: {
    pageInfo,
    modernTable,
    action,
    status,
  },
  data(){
    return {
      halls: [],
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 80%;
  margin: 25px auto;
  padding-top: 40px;
  padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
}
</style>