<template>
	<div class="headerWrap">
		<div class="title">{{$store.state.agencyName}}</div>
		<div class="rightArea">
			<div class="headPortraitWrap">
				<div class="headPortrait" @mouseover="menuShow=true" @mouseleave="menuShow=false">
					<img v-if="!avatar" src="../../assets/img/avatar.png" alt="">
					<img v-else :src="avatar" alt="">
					<p class="text">韩商言</p>
					<div class="menu" ref="menu" v-if="menuShow" @mouseleave="menuShow=false">
						<div class="fd"></div>
						<div class="div1" @click="goPerson"><img src="../../assets/img/person.png" class="image"/>个人信息</div>
						<div class="div2"></div>	
						<div class="div1"><img src="../../assets/img/take.png" class="image"/>任职信息</div>
						<div class="div2"></div>	
						<div class="div1" @click="logout"><img src="../../assets/img/out.png" class="image"/>推出登陆</div>
					</div>
				</div>
			</div>
			<div class="iconWrap">
				<!--<div class="iconLine"></div>
				<div class="icon icon-Mobile-terminal"></div>-->
				<!--<div class="iconLine"></div>
				<div class="icon icon-Customer-service"></div>-->
				<div class="iconLine"></div>
				<div class="icon icon-notice"></div>	
			</div>
		</div>
		<!-- <personal v-if="$store.state.personal"></personal> -->
	</div>
</template>
<script>
	// import personal from "../panelPage/personCenter/personal"
export default {
	name: 'headComponent',
	// components: {
	// 	personal
    // },
	data () {
		return {
			menuShow: false,
			avatar: ''
		}
	},
	methods: {
		logout() {
			localStorage.removeItem('menuList')
			localStorage.removeItem('agencyId')
			localStorage.removeItem('agencyName')
			localStorage.removeItem('userId')
			sessionStorage.removeItem('redirectUrl')
			localStorage.removeItem('account')
			// Cookie.remove('token')
			window.location.href = window.location.href.split('#')[0]
		},
		goPerson() {
			this.$store.dispatch('personal')
		}
	}
}
</script>
<style scoped lang="less">
.headerWrap{
	flex:1;
	border-left:1px solid #ececec;
	height:50px;
	background-color:#fff;
	.title{
		height: 17px;
		line-height: 17px;
		float:left;
		color: rgba(102, 102, 102, 1);
		font-size: 12px;
		padding:16px 0 0 20px;
	}
	.rightArea{
		float:right;
		height:100%;
		position: relative;
		.menu{
			position: absolute;
			width: 120px;
			height: 152px;
			background-color: #ffffff;
			box-shadow: 0px 0px 10px 2px rgba(68, 73, 80, 0.15);
			right:10px;
			top: 55px;
			cursor: pointer;
			z-index: 9;
			.fd{
				height: 50px;
				width: 60px;
				position: absolute;
				top: -49px;
				left: 60px;
			}
			.div1{
				padding: 15px 0;
				text-align: center;
				font-size: 14px;
				color: #666666;
				height: 50px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 0 21px;
				.image{
					width: 12px;
					height: 14px;
					display: block;
				}
			}
			.div2{
				width: 90px;
				height: 1px;
				background-color: #ececec;
				margin: 0 auto;
			}
		}
		.headPortraitWrap{
			width:100px;
			height:100%;
			float:right;
			.headPortrait{
				width:76px;
				height:50px;
				border-radius:50%;
				display: flex; 
				justify-content: space-between;
				align-items: center;
				.text{
					float: right;
					width: 36px;
					height: 17px;
					font-size: 12px;
					color: #666666;
				}
				img{
					width: 30px;
					height: 30px;
					margin-right: 10px;
				}
			}
		}
		.line{
			float:right;
			width: 3px;
			height:100%;
			background-color:rgba(244, 248, 252, 1);
		}
		.iconWrap{
			float:right;
			height:100%;
			.icon{
				float:right;
				width:15px;
				height:23px;
				font-size:18px;
				margin:17px -6px 0 0;
			}
			.iconLine{
				float:right;
				width:1px;
				height:20px;
				margin:17px;
				background-color:#e4e4e4;
			}
		}
	}		
}
</style>