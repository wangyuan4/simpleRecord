import Router from 'koa-router';
import { 
  createTable, 
  searchUserByNameFun, 
  addUserFun, 
  searchFriendsFun, 
  addFriendFun, 
  getUsersFun, 
  delFriendFun,
	shareFileFun,
	updateFriendFun,
	delSFileFun
} from "../sqls/index";
import {createUTC} from './comDataDeal'
import { BADRESP } from 'dns';

const router = new Router();

router.get('/api/searchuser',async (ctx, next) => {
	const {name,pwd} = ctx.query;
  const data = await searchUserByNameFun(name)
	let msg = ''
	if(data.length && data[0].user_pwd !== pwd){
		msg = '密码错误,请重试！'
	}else if(!data.length){
		msg = '该用户不存在，请先注册！'
	}
	return ctx.body = msg.length ? {
		status:false,
		msg
	} : {
		status:true,
		list:data
	} ;
});

router.post('/api/adduser',async (ctx,next) => {
	const {name,pwd} = ctx.request.body;
  const data = await searchUserByNameFun(name)
	if(data.length === 0){
		const userId = createUTC()
		const result = await addUserFun(userId,name,pwd);
		const res = await createTable(userId)
		ctx.body = result && res && {
			status:true,
			list:[{
				user_id:userId,
				user_name:name,
				user_pwd:pwd
			}]
		};
	}else{
		ctx.body = {
			status:false,
			msg:'该用户已存在，请直接登录！'
		};
	}
})

router.post('/api/addfriend',async (ctx,next) => {
	const {userId,friendId} = ctx.request.body;
	const res = await addFriendFun(userId,friendId);
  ctx.body = res ? true : false;
})

router.post('/api/updatefriend', async (ctx, next) => {
	const { userId, friendId, status } = ctx.request.body;
	const res = await updateFriendFun(userId, friendId, status);
	ctx.body = res ? true : false;
})

router.get('/api/getfriendslist',async (ctx, next) => {
	const {userId,val,status} = ctx.query;
	console.log(ctx.query)
	const res = await searchFriendsFun(userId,val,status);
  return ctx.body = res ? {
    status: true,
    list: res
  } : {
      status: false,
      msg: '服务器内部错误！'
  }
});

router.get('/api/getuserlist', async (ctx, next) => {
  const { userId, val } = ctx.query;
  const res = await getUsersFun(userId, val)
  return ctx.body = res ? {
    status: true,
    list: res
  } : {
    status: false,
    msg: '服务器内部错误！'

  }
});

router.post('/api/deletefriend', async (ctx, next) => {
  const { userId, friendId } = ctx.request.body;
  const res = await delFriendFun(userId, friendId);
  ctx.body = res ? true : false;
})

router.post('/api/sharefile', async (ctx, next) => {
	const { userId, friendIds, fileId, fileAuth } = ctx.request.body;
	let isSuc = true
	friendIds.forEach(async el => {
		const res = await shareFileFun(userId, el, fileId, fileAuth);
		console.log('res-----------------',res)
		isSuc = res ? true : false
  });
  ctx.body = isSuc ? true : false;
})

router.post('/api/delsharefile', async (ctx, next) => {
	const { userId, fileId} = ctx.request.body;
	const res = await delSFileFun(userId,fileId)
	ctx.body = res ? true : false;
})


export default router
