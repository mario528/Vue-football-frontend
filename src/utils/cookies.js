// 获取cookie
function _getCookie (keyName) {
  let arr
  let reg = new RegExp('(^| )' + keyName + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
exports.delCookie = function (keyName) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = _getCookie(keyName)
  console.log('__________________', cval)
  if (cval != null) {
    document.cookie = keyName + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
