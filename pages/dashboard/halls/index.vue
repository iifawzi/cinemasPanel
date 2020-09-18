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
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </template>
          <template v-slot:table__data>
            <tr>
              <td>1</td>
              <td>Al-Forsan</td>
              <td>
                <status value="Open" status="open" />
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

export default {
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