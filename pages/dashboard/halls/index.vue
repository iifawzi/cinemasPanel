<template>
  <div class="addhall">
    <pageInfo :title="$t('pages.halls.title')" :desc="$t('pages.halls.desc')" />
    <div class="content">
      <div class="loading" v-if="loading === true">
        <loading type="circles" />
      </div>
      <div class="addHall-btn" @click="$router.push('/dashboard/halls/addhall')">
        <submitButton color="light-blue" :title="$t('buttons.add')" />
      </div>
      <div class="hallsTable" v-if="loading === false">
        <modernTable>
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
            <tr v-for="(hall, i) of halls" :key="hall.hall_id">
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
                  <action
                    action="delete"
                    icon="far fa-trash-alt"
                    @click="toggleDialog(hall.hall_id)"
                  />
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:table__data v-else>
            <tr>
              <td colspan="4">
                <div class="no-data">
                  <span class="text">{{$t('short_texts.noHalls')}}</span>
                </div>
              </td>
            </tr>
          </template>
        </modernTable>
      </div>
    </div>
    <fixedDialog @askToClose="toggleDialog" v-if="showDialog">
      <div class="dialog__content" v-if="!success && !loadingDeletion">
        {{$t("confirm.deleteHall")}}
        <div class="btn" @click="deleteHall">
          <submitButton color="red" :title="$t('buttons.confirm')" />
        </div>
      </div>
      <div class="dialog__content-success" v-if="!loadingDeletion && success">
        <success>تم حذف القاعه بنجاح</success>
      </div>
      <div class="dialog__content-loading" v-if="loadingDeletion">
        <loading type="circles" />
      </div>
    </fixedDialog>
    <notification :label="error" v-if="error != ''" />
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
import success from "~/components/shared/success";
import notification from "~/components/shared/notification";
export default {
  async mounted() {
    await this.getHalls();
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
      showDialog: false,
      IDtoDelete: -1,
      success: false,
      error: "",
      loadingDeletion: false,
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
    submitButton,
    success,
    notification,
  },
  methods: {
    async getHalls() {
      this.loading = true;
      const [halls, halls_error] = await handle(this.$api.get("halls/"));
      this.halls = halls.data.data;
      this.loading = false;
    },
    toggleDialog(hall_id = -1) {
      this.success = false;
      this.showDialog = !this.showDialog;
      this.IDtoDelete = hall_id;
    },
    async deleteHall() {
      this.loadingDeletion = true;
      const [deletedHall, deletedHall_error] = await handle(
        this.$api({
          method: "DELETE",
          url: "halls/deleteHall",
          data: { hall_id: this.IDtoDelete },
        })
      );
      this.loadingDeletion = false;
      if (deletedHall) {
        this.success = true;
        setTimeout(() => {
          this.showDialog = false;
        }, 1000);
        await this.getHalls();
      }
      if (deletedHall_error) {
        this.error = "حدث خطأ ما يرجى المحاولة لاحقًا";
      }
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
  .addHall-btn {
    width: 100px;
    height: 30px;
    margin: 0px 30px;
  }
  .hallsTable {
    margin-top: 30px;
    .no-data {
      display: flex;
      flex-flow: column;
      align-items: center;
      .text {
        font-size: 2rem;
        color: $red;
      }
    }
  }

  .dialog__content {
    font-size: 2rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .btn {
      width: 120px;
      height: 30px;
      margin-top: 15px;
    }
  }
}
</style>