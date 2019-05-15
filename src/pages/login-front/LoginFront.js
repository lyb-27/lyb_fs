import api from '@/api/';
import * as tools from '@/utils/tools';
import { Button } from 'iview';
import { mapActions } from 'vuex';
export default {
	components: {
		Button
	},
	data () {
		return {
			username:'',
			password:'',
			imgCoding:'',
			cmsCode:'',
			imgData:'',
			clicked:false,
			buttonInfo:'获取验证码',
			newUuid:''
		}
	},
	methods: {
		...mapActions('common', ['getLeftNavLists']),
		// 随机数
		getUUID () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
					return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
			})
		},
		// 发送短信验证码
		sendCoding () {
			api.sendCoding({username:this.username,password:this.password,captcha:this.imgCoding,uuid:this.newUuid}).then(res=>{
				if (res.code === 0) {
					this.$Message.success(res.msg)
					this.clicked = true
					var timeLine = 60
					let run = window.setInterval(() => {
						timeLine--;
						this.buttonInfo = timeLine + "秒后重发";
						if (timeLine === 0) {
							window.clearInterval(run);
							this.buttonInfo = "重新发送";
							this.clicked = false;
						}
					}, 1000);
				} else {
					this.$Message.error(res.msg)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		// 发送验证码
		changeImg () {
			this.newUuid = this.getUUID()
			this.getImgUrl()
		},
		getImgUrl() {
			this.newUuid = this.getUUID()
      this.imgData = `${process.env.VUE_APP_API_BASEURL}captcha.jpg?uuid=${this.newUuid}`;
		},
		$_goLogin() {
			api.login({
				username: this.username,
        password: this.password,
        captcha: this.cmsCode,
        uuid: this.newUuid
			}).then(res=>{
				if (res.code === 0) {
					this.$Message.success('登录成功')
					let updateNavLists = []
					let firstPath = {
						colorMark: true,
						name: "首页",
						path1: "home",
						path2: "/first_home",
					}
					updateNavLists.push(firstPath)
					window.localStorage.setItem('backNavLists',JSON.stringify(updateNavLists))
					this.$router.push({path:'/first_home/home'});
					window.localStorage.setItem("backtoken", res.token);
					window.localStorage.setItem("backusername", res.user.username);
					window.localStorage.setItem("backrealname", res.user.realname);
					window.localStorage.setItem("backuserCompetence",res.user.userCompetence);
					this.getLeftNavLists()
					if (data.data.user.appIds) { 
						window.localStorage.setItem("backappIds", res.user.appIds.replace(/,/g,'|'));
					} else {
						window.localStorage.setItem("backappIds", "");
					}
				} else {
					this.$Message.error(res.msg)
				}
			}).catch(err=>{
				
			})
		},
		
	},
	created () {
		this.getImgUrl();
	}
}