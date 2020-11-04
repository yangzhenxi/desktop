<template>
  <a-card
    :loading="loading"
    :body-style="{ padding: '24px' }"
    :class="[hover ? 'card-hover' : '']"
    :bordered="false"
  >
    <div class="card-header">
      <div class="meta">
        <span class="card-title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <span class="card-extra">
          <slot name="extra"></slot>
        </span>
        <span class="card-action">
          <slot name="action"></slot>
        </span>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots && $slots.footer" class="card-footer">
      <div class="field">
        <slot name="footer"></slot>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.card-hover {
  &:hover {
    cursor: pointer;
    -webkit-transform: translate(-6px,-6px);
    transform: translate(-6px,-6px);
    -webkit-box-shadow: 6px 6px 5px 0 rgba(127,131,137,.4);
    // box-shadow: 6px 6px 2px 0 rgba(95,151,249,.4);
    box-shadow: 6px 6px 5px 0 rgb(127,131,137, 40%);
    // box-shadow: 6px 6px 2px 0 rgb(119 120 136 / 40%);
  }
}
.card-header {
  position: relative;
  overflow: hidden;
  width: 100%;
  .meta {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 32px;
    color: rgba(0, 0, 0, .45);
    font-size: 15px;
    line-height: 24px;
  }
}
.card-extra {
  margin-left: 24px;
}
.card-action {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;

  > * {
    position: relative;
  }
  .field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 15px;
    line-height: 24px;
  }
}
.card-content {
  margin-bottom: 12px;
  width: 100%;
  font-size: 15px;
  line-height: 24px;
}
</style>
