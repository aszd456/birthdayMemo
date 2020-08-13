var getToday = function() {
	let now = new Date()
	let y = now.getFullYear()
	let m = now.getMonth() + 1
	let d = now.getDate()
	let today = y + '/' + m + '/' + d
	return today
}

var getFullYear = function() {
	let now = new Date()
	return now.getFullYear()
}

var dateDiff = function(sDate1, sDate2) {
	sDate1 = sDate1.replace(/-/g, '/')
	sDate2 = sDate2.replace(/-/g, '/')

	let oDate1 = new Date(sDate1)
	let oDate2 = new Date(sDate2)
	let iDays = parseInt((oDate2 - oDate1) / 1000 / 3600 / 24)
	return iDays
}

var getNextBirthday = function(b_day) {
	let today = getToday()
	let y = getFullYear()
	let n = dateDiff(today, y + '-' + b_day)
	if (n < 0) {
		y++
		n = dateDiff(today, y + '-' + b_day)
	}
	return n
}

export default {
	getToday,
	getFullYear,
	dateDiff,
	getNextBirthday
}
