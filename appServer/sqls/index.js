import {
	searchUserFun,
	addUserFun,
	searchFriendsFun,
	createTable,
	addFriendFun
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
	host     : 'localhost',
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
	searchUserFun,
	addUserFun,
	createTable,
	searchFriendsFun,
	addFriendFun,
	addFileFun,
	getFileById,
	getFileList,
	deleteFileFun,
	updateFileFun
}

