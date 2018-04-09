import _ from 'lodash'
import { query } from "./index";

const createId = () => Math.round(new Date().getTime()/1000)

export const addFileFun = (id, fileId, title, content, type,fileType,updateTime) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        insert into file (file_id,file_title,file_content,user_id,file_type,update_time,type) values ("${fileId}","${title}","${content}","${id}","${fileType}","${updateTime}",${type})
      `;
      console.log(sql)
    query(sql,resolve,reject)

  })
}

export const getFileList = (id,type) => {
  return new Promise((resolve,reject) => {
    const sql = `
      select * from file where user_id = '${id}' and file_type = ${type} 
		`;
		console.log(sql)
    query(sql,resolve,reject)
  })
}

export const getFileById = (id) => {
  return new Promise((resolve,reject) => {
    const sql = `
      select * from file where file_id = '${id}' 
    `;
    query(sql,resolve,reject)
  })
}

export const updateFileFun = (fileId, title, content, updateTime) => {
  return new Promise((resolve,reject) => {
    const sql = `
      update file set
    `;
    query(sql,resolve,reject)
  })
}

export const deleteFileFun = (fileId) => {
    return new Promise((resolve,reject) => {
      const sql = `
        delete from file where file_id = ${fileId}  
      `;
      query(sql,resolve,reject)
    })
  }


