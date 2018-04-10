import _ from 'lodash'
import {query} from './index'


export const createTable = (userId) => {
  console.log(userId)
  return new Promise((resolve,reject) => {
    const sql = 'create table F' + userId + '(id int auto_increment,friend_id varchar(20),friend_note varchar(20),file_id varchar(20),primary key (id))'
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

export const searchFriendsFun = (userId,val) => {
  return new Promise((resolve,reject) => {
    const  sql = val ? 
      `
        select * from F${userId},user where user.user_id = F${userId}.friend_id and user.user_name like '%${val}%' or user.user_id like '%${val}%'
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
        insert into F${userId} (friend_id,friend_note,file_id) values ('${friendId}','','')
      `;
    query(sql,resolve,reject)
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
    const sql = `
        delete from F${userId} where friend_id = '${friendId}' 
      `;
    query(sql, resolve, reject)
  })
}

export const shareFileFun = (userId, friendId, fileId) => {
  return new Promise((resolve, reject) => {
    const sql = `
        update F${userId} where set file_id = '${fileId}' where friend_id = '${friendId}' 
      `;
    query(sql, resolve, reject)
  })
}

