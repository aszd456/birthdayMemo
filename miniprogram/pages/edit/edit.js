// pages/edit/edit.js
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '点击设置生日'
	},
	dateChange(e) {
		this.setData({
			date: e.detail.value
		})
	},
	onSubmit(e) {
		let info = e.detail.value
		let date = info.birthday.substring(5)
		console.log(date)
		info.date = date

		let id = this.data.id

		if (id == 'new') {
			let i = Math.ceil(Math.random() * 9)
			info.avatar = '/images/avatar/00' + i + '.jpg'
			birthday.add({
				data: info,
				success: res => {
					wx.navigateBack()
				},
				fail: err => {
					wx.showToast({
						title: '保存失败'
					})
				}
			})
		} else {
			birthday.doc(id).update({
				data: info,
				success: res => {
					wx.navigateBack()
				},
				fail: err => {
					wx.showToast({
						title: '保存失败'
					})
				}
			})
		}
	},
	cancelEdit() {
		wx.navigateBack()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let id = options.id
		this.setData({
			id: id
		})
		if (id != 'new') {
			birthday.doc(id).get({
				success: res => {
					this.setData({
						info: res.data,
						date: res.data.birthday
					})
				}
			})
		}
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
