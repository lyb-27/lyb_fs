<template>
<div class="login">
	<div class="loginItems">
		<div class="title">
			<span>登录</span>
		</div>
		<div class="userInfo">
			<div>
				<p>用户名：</p>
				<input type="text" placeholder="请输入登录账号" v-model="username">
			</div>
			<div>
				<p>密码：</p>
				<input type="password" placeholder="请输入您的密码" v-model="password">
			</div>
			<div>
				<p>验证码：</p>
				<input type="text" placeholder="请输入图形验证码" v-model="imgCoding">
				<img :src="imgData" alt @click="changeImg">
			</div>
			<div>
				<p>短信验证码：</p>
				<input type="text" placeholder="请输入短信验证码" v-model="cmsCode">
				<button @click="sendCoding" :disabled="clicked">{{buttonInfo}}</button>
			</div>
		</div>
		<div>
			<Button type="primary" long @click="$_goLogin">登录</Button>
		</div>
	</div>
</div>
	
</template>

<script src="./LoginFront.js">
</script>

<style src="./LoginFront.less" lang="less" scoped></style>
