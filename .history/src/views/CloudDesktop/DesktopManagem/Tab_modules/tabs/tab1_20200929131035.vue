<template>
  <m-table
    :columns="columns"
    :data="loadData"
    ref="table"
    rowKey="id">
    <template
      slot="action"
      slot-scope="text,record">
      <a-button
        type="primary"
        shape="circle"
        icon="form"
        @click="$refs.VersionEdit.Edit(record)"
        style="margin-right:20px" />
      <a-button
        type="danger"
        shape="circle"
        @click="VersionDelete(record)">
        <a-icon type="delete" />
      </a-button>
    </template>
  </m-table>
</template>

<script>
export default {

}
</script>

<style>

</style>
