<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    append-to-body
  >
    <!-- 用append-to-body直接插入到body下面，原先el-dialog的z-index就不会失效了 -->
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.visible;
      },
      set: function (newValue) {
        this.$emit("update:visible", newValue);
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    confirmDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style></style>
