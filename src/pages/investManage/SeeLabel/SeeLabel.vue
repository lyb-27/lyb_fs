<template>
	<div>
		<dl class="clearfix label-item-wrap">
			<dt class="label-item-label" :style="{ width: labelWidth + 'px' }">{{ label }}</dt>
			<dd class="label-item-value">
				<span v-if="value">{{ value }}</span>
				<!-- <Icon type="close-round" size="26"></Icon> -->
			</dd>
			<dd class="label-item-btn"><slot :value="labelId"></slot></dd>
		</dl>
	</div>
</template>

<script src="./SeeLabel.js">

</script>
<style lang="less" scoped src="./SeeLabel.less">

</style>

