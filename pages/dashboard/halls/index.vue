<template>
  <div class="addhall">
    <pageInfo :title="$t('pages.halls.title')" :desc="$t('pages.halls.desc')" />
    <div class="content">
      <div class="loading" v-if="loading === true">
        <loading type="circles" />
      </div>
      <div class="hallsTable" v-if="loading === false">
        <modernTable apiURL="halls/" v-if="halls.length != 0">
          <template v-slot:table__head>
            <th class="number">
              #
              <i class="fas fa-arrow-up arrow"></i>
            </th>
            <th>{{$t('general.name')}}</th>
            <th>{{$t('general.status')}}</th>
            <th>{{$t('general.actions')}}</th>
          </template>
          <template v-slot:table__data v-if="halls.length != 0">
            <tr v-for="(hall, i) of halls" :key="hall.id">
              <td>{{i+1}}</td>
              <td>{{hall.hall_name}}</td>
              <td>
                <status
                  :value="hall.hall_status === true ? $t('general.open') : $t('general.close')"
                  :status="hall.hall_status === true ? 'open' : 'close'"
                />
              </td>
              <td>
                <div class="actions">
                  <action action="show" icon="far fa-edit" />
                  <action action="delete" icon="far fa-trash-alt" @click="toggleDialog" />
                </div>
              </td>
            </tr>
          </template>
        </modernTable>
        <div class="no-data" colspan="4" v-else>
          <notFound svgHeight="120" svgWidth="120" />
          <span class="text">{{$t('short_texts.noHalls')}}</span>
        </div>
      </div>
    </div>
    <fixedDialog @askToClose="toggleDialog" v-if="showDialog">
      <div class="dialog__content">
{{$t("confirm.deleteHall")}}
<div class="btn">
<submitButton color="red" :title="$t('buttons.confirm')"/>
</div>
      </div>
    </fixedDialog>
  </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo";
import modernTable from "~/components/shared/modernTable";
import action from "~/components/shared/action";
import status from "~/components/shared/status";
import handle from "~/helpers/handle.js";
import loading from "~/components/shared/loading";
import fixedDialog from "~/components/shared/fixedDialog";
import notFound from "~/components/svg/notFound";
import submitButton from "~/components/shared/submitButton";
export default {
  async mounted() {
    this.loading = true;
    const [halls, halls_error] = await handle(this.$api.get("halls/"));
    this.halls = halls.data.data;
    this.loading = false;
  },
  head() {
    return {
      title: "Halls",
    };
  },
  data() {
    return {
      halls: [],
      loading: false,
      showDialog: true,
    };
  },
  layout: "dashboard",
  components: {
    pageInfo,
    modernTable,
    action,
    status,
    loading,
    notFound,
    fixedDialog,
    submitButton
  },
  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
  },
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
  .no-data {
    display: flex;
    flex-flow: column;
    align-items: center;
    .text {
      margin-top: 40px;
      font-size: 2rem;
      color: $red;
    }
  }
  .dialog__content{
    font-size: 2rem;
    display: flex;
    flex-flow: column;
    justify-content:center;
    align-items: center;
    .btn {
      width: 120px;
      height: 30px;
      margin-top: 15px;
    }
  }
}
</style>