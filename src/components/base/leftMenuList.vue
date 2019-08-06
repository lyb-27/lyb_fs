<template>
	<div class="leftMenuListWrap">
		<div class="headLeft">
			<div class="title">
				<div class="logo"></div>
				<div class="titleTxt">蓝鸟工作</div>
				<div class="logo1 icon-Menu-bar-zoom"></div>
			</div>
		</div>
		<div class="line"></div>
		<div class="menuList">
			<div class="homepage">
				<router-link class="item" :to="{name:'homePage'}" tag="div">
					<i class="icon-home-page"></i>
					<div @click="toHome">首页</div>
				</router-link>
			</div>

			<div class="menuItem" v-for="(item,key) in menuItem" :key="key" @click="menuHandleClick(key)">
				<div class="item">
					<i :class="item.icon"></i>
					<div class="menuName">{{item.title}}</div>
					<div class="arrowIcon" :class="{'icon-ji1antouarrow483':checkMenu[key],'icon-jiantouarrow483':!checkMenu[key]}"></div>
				</div>
				<div class="childrenWrap">
					<transition name="fade">
						<div v-if="checkMenu[key]" class="fadeWrap" @click.stop="stop($event)">
							<div class="childrenItem" v-for="(a,k) in item.children" :key="k">
								<div @click.stop="childrenItemHandleClick(k)" :class="{selectTag: checkItemMenu[k]}">
									<router-link tag="a" :to="{name:a.name}">{{a.title}}</router-link>
								</div>
								<div class="leftIcon" v-if="checkItemMenu[k]"></div>
							</div>
						</div>
					</transition>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import { mapGetters} from 'vuex';
export default {
	name: 'leftMenuList',
	data () {
		return {
			menuItem: [],  //菜单列表
			checkMenu: [],  //一级菜单展开
			checkItemMenu: [], //二级菜单展开
		}
	},
	created() {
		this.menuItem = this.$store.state.common.menuItem
		this.checkMenu = this.menuItem.map(i=>{
			this.checkItemMenu = i.children.map(i=>{
				return false
			})
			return false
		})
		this.selectMenu()
	},
	methods: {
		stop(e) {
			console.log(e)
		},
		menuHandleClick(key) {
			this.checkMenu = this.checkMenu.map((item,i)=>{
				if (item) {
					return false
				}
				if(i == key) {
					this.checkItemMenu = this.checkItemMenu.map(()=>false)
					return true
				}
				return false
			})
		},
		childrenItemHandleClick(k) {
			this.checkItemMenu = this.checkItemMenu.map((item,i)=>{
				if(i == k) {
					return true
				}
				return false
			})
		},
		toHome() {
			this.checkMenu = this.checkMenu.map(()=>{
				return false;
			})
		},
		selectMenu() {
			for(let i=0;i<this.menuItem.length;i++){
				for(let j=0;j<this.menuItem[i].children.length;j++) {
					if (this.menuItem[i].children[j].name == this.$route.name) {
						this.checkItemMenu[j] = true
						this.checkMenu[i] = true
						break
					}
				}
			}
		}
	}
}
</script>
<style scoped lang="less">
	.leftMenuListWrap{
		width:180px;
		height:100%;
		background-color:#fff;
		.headLeft{
			width:180px;
			.logo{
				background: url('../../assets/img/logo@3x.png') no-repeat;
				background-size: 100% 100%;
				width: 24px;
				height: 20px;
				float:left;
				margin:15px 0 0 15px;
			}
			.logo1{
				width: 20px;
				height: 16px;
				float:right;
				margin:19px 15px 0 0;
				color: #4C8AFF;
			}
			.title{	
				height:50px;
				overflow:hidden;
				.titleTxt{
					height:17px;
					line-height:17px;
					text-align:center;
					font-size:12px;
					color:#444950;
					background-color:#fff;
					float:left;
					margin:17px 0 0 10px;
				}
				
			}
		}
		.line{
			height:1px;
			background-color:#ececec;
		}
		.menuList{
			background-color:#fff;
			.homepage{
				font-size:14px;
				color:#444950;
				.item{
					padding: 20px 0 10px 0;
					i{
						float:left;
						font-size:18px;
						text-indent:15px;
					}
					height:20px;
					line-height:20px;
					text-indent:15px;
					cursor:pointer;
				}
			}
			.menuItem{
				font-size:14px;
				color:#444950;
				.item{
					padding:15px 0 10px 0;
					i{
						float:left;
						font-size:18px;
						text-indent:15px;
					}
					.menuName{
						float:left;
					}
					height:20px;
					line-height:20px;
					text-indent:15px;
					cursor:pointer;
					.arrowIcon{
						font-size: 10px;
						float:right;
						margin: 5px 15px 0 0;
					}
					.active{
						transform:rotate(180deg);
						transition: all .3s;
						-webkit-transition: all .3s;
						-webkit-transform:rotate(180deg);
					}

				}
				.childrenWrap{
					background-color:#EAF3FE;
					.fade-enter-active, .fade-leave-active{
						overflow:hidden;
						max-height: 300px;
					    transition: max-height 1s;
					    -webkit-transition: max-height 1s;
					}
					.fade-enter, .fade-leave-to{
						overflow:hidden;
					  	max-height: 0px;
					  	transition: max-height .5s;
					    -webkit-transition: max-height .5s;
					}
				}
				.childrenItem{
					height:17px;
					line-height:17px;
					text-indent:48px;
					padding-top: 15px;
					font-size:12px;
					cursor:pointer;
					position:relative;
					div a{
						color:#666;
					}
					.selectTag a{
						color:#4C8AFF;
					}
					.leftIcon{
						width:4px;
						height:22px;
						background-color:#4C8AFF;
						position:absolute;
						top:12px;
						left: 0
					}
				}
				.childrenItem:last-child{
					padding-bottom:15px;
				}
			}
		}
	}
</style>