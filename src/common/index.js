// 注册自定义插件

export default{
	install: function(Vue, opt) {
		// 定义 goBack 实例方法，返回上一页
		Vue.mixin({
			data: function() {
				return {
					seieiURL: "http://www.etscn.com.cn:38080"
				}
			},
			methods: {
				goBack: function() {
					this.$router.go(-1);
				},
				touchS: function(event) {
					event.target.style.backgroundColor = '#eee';
				},
				touchE: function(event) {
					event.target.style.backgroundColor = '#fff';
				},
				// 格式化时间，如 2019年5月30日 转 2019-05-30
				formatTime: function(dateStr) {
					var year = dateStr.split("年")[0];
					var month = dateStr.split("年")[1].split("月")[0];
					month = month.length == 1 ? "0" + month : month;
					var day = dateStr.split("月")[1].split("日")[0];
					day = day.length == 1 ? "0" + day : day;
					return year + "-" + month + "-" + day;
				},
				// 添加一天
				addOneDay: function(dataStr) {
					var time = new Date(dataStr).getTime();
					var result = new Date(time + 86400000);
					var year = result.getFullYear();
					var month = Number(result.getMonth()) + 1 + "";
					month = month.length == 1 ? "0" + month : month;
					var day = result.getDate() + "";
					day = day.length == 1 ? "0" + day : day;
					return year + "-" + month + "-" + day;
				}
			},
			created: function () {
      			if (this.$store.state.userMsg.length == 0) {
      				/*this.$router.push({name: "signin"});*/
      			}
    		}
		})
	}
}