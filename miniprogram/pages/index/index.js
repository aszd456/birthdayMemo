import utils from "../../utils/utils.js";
const db = wx.cloud.database();
const birthday = db.collection('birthday');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	addFriend() {
		let id = 'new'
		wx.navigateTo({
			url: '../edit/edit?id=' + id
		})
	},
	onCancel(e) {
		this.getFriendsList()
	},
	onSearch(e) {
		let keyword = e.detail
		console.log(keyword)
		birthday.where({
			name: db.RegExp({
				regexp: keyword,
				options: 'i'
			})
		}).orderBy('date', 'asc').get({
			success: res => {
				this.processData(res.data)
			}
		})
	},
	getFriendsList() {
		birthday.limit(10).orderBy('date', 'asc').get({
			success: res => {
				console.log(res.data)
				this.processData(res.data)
			}
		})
	},
	processData(list) {
		for (let i = 0; i < list.length; i++) {
			let date = list[i].date
			let n = utils.getNextBirthday(date)
			list[i].n = n
		}
		this.setData({
			friendsList: list
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
      console.log(utils)
      console.log(utils.getToday())
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.getFriendsList()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
