<template>
    <div id="userLogin">
        <div class="fn"> 
            <div class="pictrue"><img src="../../assets/img/lanniaoyun.png" alt=""></div>
            <div class="content"> 
                <div class="logBox">
                    <p>登录</p>
                    <div class="icon">
                        <div class="promptOne" v-if="emptyEmail"><img src="../../assets/img/prompt1.svg" alt=""><span>请输入邮箱</span></div>
                        <div class="promptFor" v-if="emptyEmailPassword"><img src="../../assets/img/prompt1.svg" alt=""><span>请输入邮箱和密码</span></div>
                        <div class="promptTwo" v-if="showIcon"><img src="../../assets/img/prompt1.svg" alt=""><span>该账号不存在</span></div>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px" size="medium">
                        <div class="email">
                            <el-input 
                              :autofocus="localEmail"
                              v-model="form.email" 
                              placeholder="邮箱账号" 
                              type="email" 
                              @input="nice" 
                              @keydown.tab.native="email(form.email)">
                            </el-input>
                            <img src="../../assets/img/youxiang.svg" alt="">
                        </div>
                        <div class="password">
                            <el-input 
                              :type='this.registration_data.pwdType' 
                              v-model="form.password" 
                              :autofocus="localpassword"
                              placeholder="密码" 
                              @input="nice" 
                              @focus="email(form.email)">
                            </el-input>
                            <img src="../../assets/img/mima.svg" alt="" class="lock">
                            <img :src='registration_data.src' alt="" class="eye" @click="changeType()" v-if="form.password">
                        </div>
                        <div class="company" v-if="list.length>1">
                            <el-select v-model="value" placeholder="公司">
                                <el-option :label= i.name :value= i.id v-for="(i,k) in list" :key="k"></el-option>
                            </el-select>
                            <img src="../../assets/img/gongsi.svg" alt="">
                        </div>
                    </el-form>
                    <div class="logBodyThe">
                        <div class="forgotPassword">
                            <router-link to="/" class="forget">忘记密码？</router-link>
                         </div>
                        <div class="conform" @click="conform(form.email,form.password)"><p>登录</p></div>
                        <div class="logfooter">
                            <p>还没有蓝鸟账号？</p>
                            <router-link to="/" class="click">点击预约体验</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <p>
                   <span class="companyThat">© 2018 北京蓝鸟云科技有限公司 All Rights Reserved</span>
                   <span class="interval"></span><img src="../../assets/img/gonganju.png" alt="">
                   <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502037467" style="color:#fff;">京公网安备11010502037467号</a>
                   <span class="interval"></span><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">京ICP备18064398号-2</a>
                </p>
            </footer>
        </div>
    </div>
</template>
<script>
import Cookie from "js-cookie";
import dynamicRouter from "../../router/menu.js";
import api from '@/api/';
import { mapActions } from 'vuex';
export default {
  name: "userLogin",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      value: "",
      list: [],
      registration_data: {
        pwdType: "password",
        src: require("../../assets/img/closeeye.svg")
      },
      emptyEmail: 0,
      emptyEmailPassword: 0,
      showIcon: 0,
      accountNumber: 1,
      localEmail: false,
      localpassword: false
    };
  },
  created() {
    if (this.$store.state.common.menuItem.length>0) {
      // window.location.reload()
    }
    if (localStorage.onlyEmail) {
      this.localEmail = false;
      this.localpassword = true;
    } else {
      this.localEmail = true;
      this.localpassword = false;
    }
    this.init();
  },
  methods: {
		...mapActions('common', ['setAgency','setMenu']),
    init() {
      this.form.email = localStorage.onlyEmail;
      this.form.password = localStorage.onlyPassWord;
    },
    email(item) {
      if (!item) {
        return (this.emptyEmail = 1);
      } else {
				api.agency({account: item}).then(res => {
					if (res.length == 0) {
						console.log(this.$message({}))
              this.accountNumber = res.length;
              this.$Message({
                message: "该账号不存在",
                type: "error",
                duration: 5 * 1000
              });
              return;
            } else {
              this.accountNumber = res.length;
              this.list = res;
            }
				}).catch(err => {
				});
      }
    },
    nice() {
      this.emptyEmail = 0;
      this.emptyEmailPassword = 0;
      this.showIcon = 0;
    },
    changeType() {
      this.registration_data.pwdType =
        this.registration_data.pwdType === "password" ? "text" : "password";
      this.registration_data.src =
        this.registration_data.src === require("../../assets/img/closeeye.svg")
          ? require("../../assets/img/openeye.svg")
          : require("../../assets/img/closeeye.svg");
    },
    conform(email, password) {
      if (email) {
				api.agency({account: email}).then(res => {
					console.log(res)
					if (res.length == 0) {
						this.showIcon = true;
						return;
					} else {
						this.nice();
					}
				}).catch(err => {
					console.log(err);
				});
      } else {
        return (this.emptyEmail = 1);
      }
      if (this.accountNumber == 0) {
        return (this.showIcon = true);
			}
			let data = {
          username: this.form.email,
          password: this.form.password,
          agencyId: this.list.length > 1 ? this.value : this.list[0].id
        }
			api.login(data).then(res => {
				console.log(res)
				if (res.status == 200) {
					let content = res.content
					Cookie.set("token", content.agencyUser.token);
					localStorage.clear();
					localStorage.setItem("agencyId", content.agency.id);
					localStorage.setItem("agencyName", content.agency.name);
					localStorage.setItem("userId", content.agencyUser.id);
					localStorage.setItem(
						"account",
						content.agencyUser.account
					);
					this.setAgency({
						id: content.agency.id,
						name: content.agency.name,
						avatar: content.agencyUser.avatar
					})
					// this.$store.dispatch("setAgency", );
					let menuList = content.menus.filter(
						i => i.keyCode != "A0000"
					);
					let arr = [];
					dynamicRouter.forEach(i => {
						menuList.forEach(j => {
							if (i.meta.roles[0] == j.keyCode) {
								arr.push({
									path: i.path,
									name: i.name,
									title: j.zhCn,
									icon: i.icon,
									component: i.component,
									parentId: j.parentId,
									id: j.id
								});
							}
							i.children.forEach(k => {
								if (k.meta.roles[0] == j.keyCode) {
									arr.push({
										path: k.path,
										name: k.name,
										title: j.zhCn,
										component: k.component,
										parentId: j.parentId,
										id: j.id
									});
								}
							});
						});
					});
					// this.$store.dispatch("setMenu");
					this.setMenu()
					let menu = JSON.stringify(content.menus);
					localStorage.setItem("menuList", menu);
					localStorage.setItem(
						"onlyEmail",
						content.agencyUser.account
					);
					localStorage.setItem("onlyPassWord", this.form.password);
					localStorage.onlyPassWord = "";
					this.form.password = "";
					if (sessionStorage.getItem("redirectUrl")) {
						this.$router.push({
							path: decodeURIComponent(
								sessionStorage.getItem("redirectUrl")
							).split("#")[1]
						});
					} else {
						this.$router.push({ path: "/first_home/home" });
					}
				} else {
					this.$Message({
						message: res.message,
						type: "error",
						duration: 5 * 1000
					});
				}
			}).catch(err => {
				console.log(err);
			});
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/flex.less';
#userLogin {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #f4f8fc;
  overflow-y: hidden;
  background: url("../../assets/img/beijing.png") no-repeat;
  background-size: 100% 100%;
  .fn {
    position: relative;
    width: 100%;
    height: 100vh;
    background: rgba(81, 88, 101, 0.5);
    .pictrue {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: #ffffff;
      img {
        width: 139px;
        height: 24px;
        margin-top: 19px;
        margin-left: 200px;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .logBox {
        position: relative;
        width: 500px;
        margin-top: 60px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0px 0px 12px 5px rgba(6, 29, 65, 0.1);
        border-radius: 5px;
        p {
          width: 44px;
          height: 30px;
          font-size: 22px;
          color: #444950;
          margin: 40px auto;
        }
        .icon {
          display: flex;
          margin-left: 70px;
          margin-top: -6px;
          z-index: 99;
          .promptOne {
						margin-bottom: 5px;
						.f-d-f;
						.f-ai-c;
            img {
              float: left;
              width: 12px;
              height: 12px;
              margin-right: 5px;
            }
            span {
              font-size: 12px;
              color: #e45a3c;
            }
          }
          .promptTwo {
            height: 17px;
            img {
              float: left;
              width: 12px;
              height: 12px;
              margin-right: 5px;
              margin-top: 2.5px;
            }
            span {
              font-size: 12px;
              color: #e45a3c;
            }
          }
          .promptThe {
            margin-bottom: 5px;
            img {
              float: left;
              width: 12px;
              height: 12px;
              margin-right: 5px;
              margin-top: 2.5px;
            }
            span {
              font-size: 12px;
              color: #e45a3c;
            }
          }
          .promptFor {
            height: 17px;
            img {
              float: left;
              width: 12px;
              height: 12px;
              margin-right: 5px;
              margin-top: 2.5px;
            }
            span {
              font-size: 12px;
              color: #e45a3c;
            }
          }
        }
        .email {
          position: relative;
          img {
            position: absolute;
            top: 15px;
            left: 70px;
            width: 19px;
            height: 14px;
          }
        }
        .password {
          margin-top: 20px;
          position: relative;
          .lock {
            position: absolute;
            top: 10px;
            left: 72.5px;
            width: 14px;
            height: 20px;
          }
          .eye {
            position: absolute;
            top: 20px;
            right: 72px;
            width: 14px;
            height: 12px;
            cursor: pointer;
          }
        }
        .company {
          position: relative;
          width: 400px;
          margin-left: 50px;
          margin-top: 20px;
          img {
            position: absolute;
            top: 13px;
            left: 21px;
          }
        }
        .logBodyThe {
          position: relative;
          .inputOne {
            width: 310px;
            height: 44px;
            margin-left: 50px;
            margin-top: 20px;
            background-color: #ffffff;
            border-radius: 22px;
            border: solid 1px #ececec;
            outline: none;
            padding-left: 90px;
          }
          .email {
            width: 66px;
            height: 20px;
            position: absolute;
            top: 11px;
            left: 70px;
            .emailLitter {
              width: 32px;
              font-size: 16px;
              color: #999999;
              margin-left: 10px;
            }
          }
          .triangle {
            position: absolute;
            left: 418px;
            top: 29px;
          }
        }
        .forgotPassword {
          width: 75px;
          margin-left: 386px;
          margin-top: 10px;
          .forget {
            width: 75px;
            height: 20px;
            color: #666666;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              color: #4c8aff;
            }
          }
        }
        .conform {
          width: 400px;
          height: 44px;
          margin: -23px auto;
          border-radius: 22px;
          line-height: 44px;
          background-color: #4c8aff;
          cursor: pointer;
          p {
            font-size: 16px;
            color: #ffffff;
          }
        }
        .logfooter {
          height: 44px;
          display: flex;
          margin-top: 22.5px;
          padding-bottom: 36.8px;
          justify-content: space-around;
          p {
            width: 112px;
            height: 20px;
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
            margin-left: 138px;
          }
          .click {
            position: relative;
            width: 84px;
            height: 20px;
            margin-top: 10px;
            margin-right: 156px;
            font-size: 14px;
            color: #4c8aff;
            &:hover::after {
              position: absolute;
              top: 19.5px;
              left: 0;
              content: "";
              width: 84px;
              height: 0.5px;
              background: #4c8aff;
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      height: 22px;
      position: absolute;
      bottom: 18px;
      p {
        width: 100%;
        height: 22px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        margin-top: 0px;
        .companyThat,
        a {
          font-size: 12px;
          color: #ffffff;
          font-family: "PingFangSC-Medium";
        }
        .interval {
          display: inline-block;
          width: 1px;
          height: 13px;
          margin: -1px 10px;
          background: #fff;
        }
        img {
          width: 14px;
          height: 13px;
          margin-left: 2px;
          margin-right: 3px;
        }
        a:nth-of-type(1) {
          position: relative;
          &::after {
            position: absolute;
            top: 17px;
            left: 0;
            content: "";
            display: none;
            width: 165px;
            height: 1px;
            background: #fff;
          }
          &:hover::after {
            display: inline-block;
          }
        }
        a:nth-of-type(2) {
          position: relative;
          &::after {
            position: absolute;
            top: 17px;
            left: 0;
            content: "";
            display: none;
            width: 125px;
            height: 1px;
            background: #fff;
          }
          &:hover::after {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>

