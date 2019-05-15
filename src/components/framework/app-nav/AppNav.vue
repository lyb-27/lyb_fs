<template>
<div class="app-nav">
	<ul>
		<li v-for="(navlist,index) in isNavListsGetters" :key="index">
			<Tag @click.native="goMenu(navlist)" type="dot" :closable="index!==0" :color="navlist.colorMark === true?'primary':''"  @on-close="closeNavOne(navlist)">{{navlist.name}}</Tag>
		</li> 
	</ul>
</div>
</template>

<script src="./AppNav.js"></script>

<style src="./AppNav.less" lang="less" scoped></style>
