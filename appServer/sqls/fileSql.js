import _ from 'lodash'
import { query } from "./index";

const createId = () => Math.round(new Date().getTime()/1000)

export const addFileFun = (id,fileId,title,content,type) => {
  return new Promise((resolve,reject) => {
    const  sql = `
        insert into file (file_id,file_title,file_content,user_id,file_type) values ("${fileId}","${title}","${content}","${id}",${type})
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

export const updateFileFun = (fileId,updateOpt) => {
	// let setOpt = ''
	// updateOpt.forEach(el => {
	// 	setOpt = el.keyName + '=' + el.keyVal + ','
	// });
	// const sqlSetOpt = _.dropRight(setOpt.split(',')).join(',')
	// console.log(sqlSetOpt)
  return new Promise((resolve,reject) => {
    const sql = `
      update file set ${sqlSetOpt}  
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


