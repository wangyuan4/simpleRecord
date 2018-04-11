import _ from 'lodash'
import {query} from './index'


export const createTable = (userId) => {
  console.log(userId)
  return new Promise((resolve,reject) => {
    const sql = 'create table F' + userId + '(id int auto_increment,friend_id varchar(20),friend_status int(11),file_id varchar(20),file_auth int(11),primary key (id))'
    console.log(sql)
    query(sql,resolve,reject)
  })
  
}

export const searchUserByNameFun = (val) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        select * from user where user_name like '%${val}%' or user_id like '%${val}%'
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

export const searchFriendsFun = (userId,val,status) => {
  return new Promise((resolve,reject) => {
    const  sql = status === '2' ? 
      `
        select * from F${userId},user where user.user_id = F${userId}.friend_id and friend_status = 2 and user.user_name like '%${val}%'
      ` :
      `
        select * from F${userId},user where user.user_id = F${userId}.friend_id and user.user_name like '%${val}%'
      `;
    query(sql,resolve,reject)
  })
}

export const addFriendFun = (userId,friendId) => {
  return new Promise((resolve,reject) => {
    const  sql1 = `
        insert into F${userId} (friend_id,friend_status) values ('${friendId}',0)
      `;
    const sql2 = `
        insert into F${friendId} (friend_id,friend_status) values ('${userId}',1)
    `
    query(sql1,resolve,reject)
    query(sql2, resolve, reject)

  })
}

export const updateFriendFun = (userId, friendId, status) => {
  return new Promise((resolve, reject) => {
    const sql1 = `
        update F${userId} set friend_status = ${status} where friend_id = '${friendId}'
      `;
    const sql2 = `
        update F${friendId} set friend_status = ${status} where friend_id = '${userId}' 
    `
    query(sql1, resolve, reject)
    query(sql2, resolve, reject)    
  })
}

export const getUsersFun = (userId,val) => {
  return new Promise((resolve, reject) => {
    const sql = `
        select * from user where user_id not in (select friend_id from F${userId}) and user_id != '${userId}' and user_name like '%${val}%' or user_id like '%${val}%'
      `;
    query(sql, resolve, reject)
  })
}

export const delFriendFun = (userId, friendId) => {
  return new Promise((resolve, reject) => {
    const sql1 = `
        delete from F${userId} where friend_id = '${friendId}' 
      `;
    const sql2 = `
        delete from F${friendId} where friend_id = '${userId}' 
      `;
    query(sql1, resolve, reject)
    query(sql2, resolve, reject)
  })
}

export const shareFileFun = (userId, friendId, fileId, fileAuth) => {
  return new Promise((resolve, reject) => {
    const sql = `
        insert F${friendId} (friend_id,file_id,file_auth) values ('${userId}','${fileId}',${fileAuth}) 
      `;
    query(sql, resolve, reject)
  })
}

export const delSFileFun = (userId, fileId ) => {
  return new Promise((resolve, reject) => {
    const sql = `
        delete from F${userId} where file_id = '${fileId}'
      `;
    query(sql, resolve, reject)
  })
}

