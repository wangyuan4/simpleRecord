import {
	searchUserByNameFun,
	addUserFun,
	searchFriendsFun,
	createTable,
	addFriendFun,
	getUsersFun,
	delFriendFun,
	shareFileFun,
	updateFriendFun,
	delSFileFun
} from './userSql'
import {
	getFileById,
	addFileFun,
	getFileList,
	deleteFileFun,
	updateFileFun
} from './fileSql'
const mysql  = require('mysql');

const connection = mysql.createConnection({
	host     : '118.89.24.21',
	user     : 'root',
	password : '123456',
	port: '3306',
	database: 'myapp',
});

connection.connect();

export const query = (sql,resolve,reject) => connection.query(sql,function (err, res) {
  if(err){
		console.log('[SELECT ERROR] - ',err.message);
		reject(err.message)
    return;
  }else{
    console.log('--------------------------QUERY SQL----------------------------');
    console.log(sql);
    console.log(res);
    console.log('---------------------------END------------------------------');
    resolve(res)
  }
});

export {
	searchUserByNameFun,
	addUserFun,
	createTable,
	searchFriendsFun,
	addFriendFun,
	getUsersFun,
	delFriendFun, 
	shareFileFun,
	updateFriendFun,
	delSFileFun,

	addFileFun,
	getFileById,
	getFileList,
	deleteFileFun,
	updateFileFun
}

