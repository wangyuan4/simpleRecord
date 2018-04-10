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
export const fileInfoTran = (data) => {
  return data.map(el => {
    const times = moment((new Date(el.update_time * 1000)).toString()).format('YYYY-MM-DD-HH:mm:ss').split('-')
    return {
      id: el.file_id,
      title: el.file_title,
      content: el.file_content,
      fileType: el.file_type,
      type: el.type,
      userId: el.user_id,
      month: times[1],
      day: times[2],
      time: times[3],
      isTrash: el.is_trash
    }
  })
}
