/* 
	对服务端请求来的数据转成我们想要的格式
*/
export const userInfoTran = (data,turnToObj) => {
  return turnToObj && data.length === 1 ? 
    userDetailTran(data[0]) : 
    data.map(el => userDetailTran(el));
};
const userDetailTran = (item) => {
  return ({
    id:item.user_id,
    name:item.user_name,
    pwd:item.user_pwd
  });
};
export const fileInfoTran = (data) => {
  return data.map(el => ({
    id:el.file_id,
    title:el.file_title,
    content:el.file_content,
    type:el.file_type,
    userId:el.user_id
  }));
};