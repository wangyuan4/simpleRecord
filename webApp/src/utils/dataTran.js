/*
 * 对服务端请求来的数据转成我们想要的格式
*/
import moment from 'moment'
export const userInfoTran = (data, turnToObj) => {
  return turnToObj && data.length === 1
    ? userDetailTran(data[0])
    : data.map(el => userDetailTran(el))
}
const userDetailTran = (item) => {
  return ({
    id: item.user_id,
    name: item.user_name,
    pwd: item.user_pwd
  })
}

export const friendInfoTran = (data) => {
  return data.map(el => ({
    id: el.user_id,
    name: el.user_name,
    fileAuth: el.file_auth,
    fileId: el.file_id,
    friendStatus: el.friend_status
  }))
}

export const fileInfoTran = (data, turnToObj, isDiff) => {
  const isdiff = !!isDiff
  return turnToObj && data.length === 1
    ? fileDetailTran(data[0], isdiff)
    : data.map(el => fileDetailTran(el, isdiff))
}

const fileDetailTran = (el, isDiff) => {
  const times = moment((new Date(el.update_time * 1000)).toString()).format('YYYY-MM-DD-HH:mm:ss').split('-')
  const re = {
    id: el.file_id,
    title: el.file_title,
    content: el.file_content,
    fileBlob: el.file_blob,
    diffRes: el.diffRes || [],
    fileType: el.file_type,
    type: el.type,
    userId: el.user_id,
    month: times[1],
    day: times[2],
    time: times[3],
    isTrash: el.is_trash,
    isShare: el.friend_id || false,
    friendId: el.user_id,
    friendName: el.user_name,
    fileAuth: el.file_auth,
    isDiff: isDiff || false
  }
  return re
}
