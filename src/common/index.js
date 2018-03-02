// 注册自定义插件

export default{
	install: function(Vue, opt) {
		// 定义 goBack 实例方法，返回上一页
		Vue.mixin({
			methods: {
				goBack: function() {
					this.$router.go(-1);
				}
			},
			created: function () {
      			if (this.$store.state.userMsg.length == 0) {
      				this.$router.push({name: "signin"});
      			}	
    		}
		})
	}
}