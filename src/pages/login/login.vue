<template>
	<div class="container">
		<div class="login-container">
			<div class="login-box">
				<label for="account">账号：</label>
				<input type="text" class="login-info" id="account" v-model="account" placeholder="请输入你的账号">
			</div>
			<div class="login-box">
				<label for="password">密码：</label>
				<input type="password" class="login-info" id="password" v-model="password" placeholder="请输入你的密码">
			</div>
			<div class="login-box login-code">
				<input type="text" class="code" v-model="code" placeholder="验证码">
				<div><img :src="srcImg" alt=""  @click="yzmCode()"></div>
			</div>
			<div class="submit" @click="submit">登录</div>
			<div class="reset">
				<div class="forget">忘记密码</div>
				<div class="regeist">注册</div>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	export default{
		name:'Login',
		data(){
			return {
				account:'',
				password:'',
				code:'',
				srcImg:null
			}
		},
		created(){
			this.yzmCode()
		},
		methods:{
			yzmCode(){
				let url = this.Host + '/validateCode'
				//获取页面验证码
	  		this.$axios.get(url,{responseType: 'arraybuffer'})
	  			.then(response => {
			    return 'data:image/png;base64,' + btoa(
			      new Uint8Array(response.data)
			        .reduce((data, byte) => data + String.fromCharCode(byte), '')
			    );
			  }).then(data => {
			    this.srcImg = data;
			  })
			},
			submit(){
				console.log(this.account +'-----' + this.password)
				let url = this.Host + '/user/login'
				this.$axios.post(url,{
					userAccount:this.account,
					userPassword:this.password
				}).then(res=>{
					console.log(res.data)
					console.log(2)
				}).catch(err=>{
					console.log(1)
				})
			}
		}
	}
</script>
<style lang="less" scoped="">
	.container{
		background: url(../../assets/11.jpg) no-repeat;
		background-size: cover;
		width:100%;
		height:100%;
		    display: flex;
    align-items: center;
    justify-content: center;
	}
	.login-container{
		width: 100%;
		border: 1px solid #fafafa;
    background: rgba(0,0,0,0.3);
    color: #fff;
		padding: 2rem 0;
		  display: flex;
    	flex-direction: column;
    	align-items: center;
    	.login-code{
    			img{
    				width: 6rem;
    				height: 2rem;
    			}
    		}
    	.login-box{
    		width:13rem;
    		margin: 0.6rem;
    		display: flex;
    		flex-direction: row;
				.login-info{
					border:none;
					font-size: .8rem;
					border-bottom: 1px solid #dedede;
					background: rgba(0,0,0,-0.8);
					color: #fff;
					
				}
				.code{
					width:7rem;
					border:none;
					font-size: .8rem;
					border-bottom: 1px solid #dedede;
					text-align: center;
					    background: rgba(0,0,0,-0.8);
					    color: #fff;
				}
    	}
    	.submit{
    		margin-top: 1.5rem;
		    font-size: 1rem;
		    border: 1px solid #dedede;
		    width: 13rem;
		    height: 2rem;
		    line-height: 2rem;
		    border-radius: 4px;
		    background: sandybrown;
		    color:#fff;
    	}
	}
	.reset{
		margin-top: .5rem;
    display: flex;
    justify-content: space-between;
    width: 13rem;
    flex-direction: row;
    font-size: .8rem;
	}
	input::-webkit-input-placeholder{
      color:#fff;
  }
  input::-moz-placeholder{
      color:#fff;
  }
  input:-moz-placeholder{
      color:#fff;
  }
  input:-ms-input-placeholder{  
      color:#fff;
  }
</style>