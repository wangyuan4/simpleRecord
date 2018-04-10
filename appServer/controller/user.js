import Router from 'koa-router';
import { 
  createTable, 
  searchUserByNameFun, 
  addUserFun, 
  searchFriendsFun, 
  addFriendFun, 
  getUsersFun, 
  delFriendFun,
  shareFileFun
} from "../sqls/index";
import {createUTC} from './comDataDeal'

const router = new Router();

router.get('/searchuser',async (ctx, next) => {
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

router.post('/adduser',async (ctx,next) => {
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

router.post('/addfriend',async (ctx,next) => {
	const {userId,friendId} = ctx.request.body;
	const res = await addFriendFun(userId,friendId);
  ctx.body = res ? true : false;
  // ctx.websocket.send('message')
	// ctx.websocket.on('message',(message) => {
  //   console.log(message)
  // });
})

router.get('/getfriendslist',async (ctx, next) => {
	const {userId,val} = ctx.query;
	let res = {}
	if(val === ''){
		res = await searchFriendsFun(userId)
	} else {
    res = await searchFriendsFun(userId,val);
	}
  return ctx.body = res ? {
    status: true,
    list: res
  } : {
      status: false,
      msg: '服务器内部错误！'
  }
});

router.get('/getuserlist', async (ctx, next) => {
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

router.post('/deletefriend', async (ctx, next) => {
  const { userId, friendId } = ctx.request.body;
  const res = await delFriendFun(userId, friendId);
  ctx.body = res ? true : false;
})

// router.post('/sharefile', async (ctx, next) => {
//   const { userId, friendId, fileIds } = ctx.request.body;
//   let isSuc = true
//   fileIds.forEach(el => {
//     const res = await shareFileFun(userId, friendId, el);
//     !res && !isSuc
//   });
//   ctx.body = isSuc ? true : false;
// })

export default router
