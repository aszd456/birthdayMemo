// pages/detail/detail.js
import utils from "../../utils/utils.js"
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	editFriend() {
		let id = this.data.id
		wx.navigateTo({
			url: '../edit/edit?id=' + id
		})
	},
	deleteFriend() {
		let id = this.data.id
		birthday.doc(id).remove({
			success: res => {
				wx.navigateBack()
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let id = options.id
		this.setData({
			id: id
		})
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
		let id = this.data.id
		birthday.doc(id).get({
			success: res => {
				let today = utils.getToday()
				let b_day = res.data.birthday
				let n1 = utils.dateDiff(b_day, today)
				let nb = b_day.substring(5)
				let n2 = utils.getNextBirthday(nb)
				this.setData({
					info: res.data,
					n1: n1,
					n2: n2
				})
			}
		})
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
