import _ from 'lodash'
import {query} from './index'


export const createTable = (userId) => {
  console.log(userId)
  return new Promise((resolve,reject) => {
    const sql = 'create table F' + userId + ' (friend_id varchar(20),friend_note varchar(20),friend_group varchar(20))'
    console.log(sql)
    query(sql,resolve,reject)
  })
  
}

export const searchUserFun = (queryArr) => {
	let selOpt = ''
	queryArr.forEach(el => {
    selOpt = typeof el.keyVal === 'string' ?
    `${selOpt}${el.keyName} = '${el.keyVal}' and ` :
    `${selOpt}${el.keyName} = ${el.keyVal} and `
	});
  const sqlSelOpt = _.dropRight(selOpt.split(' and ')).join(' and ')
  console.log(sqlSelOpt)
  return new Promise((resolve,reject) => {
    const  sql = `
        select * from user where ${sqlSelOpt}
      `;
    query(sql,resolve,reject)
  })
}
export const addUserFun = (id,name,pwd) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        insert into user (user_id,user_name,user_pwd) values ("${id}","${name}","${pwd}")
      `;
    query(sql,resolve,reject)
  })
}

export const searchFriendsFun = (userId,friendName) => {
  return new Promise((resolve,reject) => {
    const  sql = friendName ? 
      `
        select * from F${userId},user where user.user_id = F${userId}.friend_id and user.user_name like '${friendName}%'
      ` :
      `
        select * from F${userId},user where user.user_id = F${userId}.friend_id
      `;
    query(sql,resolve,reject)
  })
}

export const addFriendFun = (userId,friendId) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        insert into F${userId} (friend_id,friend_note,friend_group) values ('${friendId}','','')
      `;
    query(sql,resolve,reject)
  })
}


