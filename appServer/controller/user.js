import Router from 'koa-router';
import { createTable, searchUserFun,addUserFun,searchFriendsFun,addFriendFun} from "../sqls/index";
import {createId} from './comDataDeal'

const router = new Router();
const searchUserByName = async (name) => {
	const res = await searchUserFun([{
		keyName:'user_name',
		keyVal:name
	}])
	return res
}

router.get('/searchuser',async (ctx, next) => {
	const {name,pwd} = ctx.query;
	const data = await searchUserByName(name)
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
		data
	} ;
});

router.post('/adduser',async (ctx,next) => {
	const {name,pwd} = ctx.request.body;
	const data = await searchUserByName(name)
	if(data.length === 0){
		const userId = createId()
		const result = await addUserFun(userId,name,pwd);
		const res = await createTable(userId)
		ctx.body = result && res && {
			status:true,
			data:{
				user_id:userId,
				user_name:name,
				user_pwd:pwd
			}
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
	console.log(res)
	ctx.body = res ? true : false;
})

router.get('/getfriendslist',async (ctx, next) => {
	const {userId,friendName} = ctx.query;
	let friendsInfo = {}
	if(friendName === ''){
		friendsInfo = {
			list:(await searchFriendsFun(userId)),
			isFriend:true
		}
	}else{
		const res = await searchFriendsFun(userId,friendName);
		friendsInfo = res.length ? {
			list:res,
			isFriend:true
		} : {
			list: await searchUserByName(friendName),
			isFriend:false
		}
	}
	return ctx.body = friendsInfo;
});

export default router
