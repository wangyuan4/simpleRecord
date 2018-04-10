import _ from 'lodash'
import { query } from "./index";

const createId = () => Math.round(new Date().getTime()/1000)

export const addFileFun = (id, fileId, title, content, type,fileType,updateTime) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        insert into file (file_id,file_title,file_content,user_id,file_type,update_time,type,is_trash) values ("${fileId}","${title}","${content}","${id}","${fileType}","${updateTime}",${type},0)
      `;
      console.log(sql)
    query(sql,resolve,reject)

  })
}

export const getFileList = (id,type,isTrash) => {
  return new Promise((resolve,reject) => {
    const sql = parseInt(isTrash) ? `
      select * from file where user_id = '${id}' and is_trash = ${isTrash}
		` : `
      select * from file where user_id = '${id}' and file_type = ${type} and is_trash = ${isTrash}
		` 
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

export const updateFileFun = (fileId,options) => {
  const opt = []
  options.forEach(el => {
    opt.push(`${el.keyName} = ${el.keyValue}`)
  });
  const updateSql = opt.join(' and ')
  console.log(updateSql)
  return new Promise((resolve,reject) => {
    const sql = `
      update file set ${updateSql} where file_id = '${fileId}'
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


