<template>
  <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize" />
</template>

<script>
import { Icon } from 'iview';
import IconFont from '@/components/base/icon-font';
export default {
  name: 'CommonIcon',
  components: { Icon , IconFont },
  props: {
    type: {
      type: String,
      required: true,
    },
    color: String,
    size: Number,
  },
  computed: {
    iconType() {
      return this.type.indexOf('_') === 0 ? 'IconFont' : 'Icon';
    },
    iconName() {
      return this.iconType === 'IconFont' ? this.getCustomIconName(this.type) : this.type;
    },
    iconSize() {
      return this.size || (this.iconType === 'IconFont' ? 12 : undefined);
    },
    iconColor() {
      return this.color || '';
    },
  },
  methods: {
    getCustomIconName(iconName) {
      return iconName.slice(1);
    },
  },
};
</script>

<style></style>
