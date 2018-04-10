import Router from 'koa-router';
import {diffLines} from 'diff';
import {
	getFileList,
	getFileById,
	addFileFun,
	updateFileFun,
	deleteFileFun
} from '../sqls/index';
import {removeSpeciChar,createUTC} from './comDataDeal'

const router = new Router();

router.get('/getfilelist',async (ctx) => {
		const {id,type,isTrash} = ctx.query;
		const result = await getFileList(id,type,isTrash);
    ctx.body = result ? {
			status:true,
			list:result
		} : {
			status:false,
			msg:'请求失败'
		}
})
router.post('/savefile',async (ctx) => {
	// var one = 'beep boop';
	// var other = 'beep boob blah';

	// var diff = jsdiff.diffChars(one, other);
	
	// console.log(diff)
	// diff.forEach(function(part){
	// 	// green for additions, red for deletions
	// 	// grey for common parts
	// 	var color = part.added ? 'green' :
	// 		part.removed ? 'red' : 'grey';
	// });
	const {id,title,content,type,fileType,fileId} = ctx.request.body;
	if(fileId !== ''){
		const result = await getFileById(fileId);
		const updateTime = createUTC()
		console.log(result)
		const diffRes = diffLines(result[0].file_content,content);
		let haveConflict = false
		diff.forEach(part => {
			if(part.removed){
				haveConflict = true
			}
		});
		haveConflict ? ctx.body = diffRes : await addFileFun(id, fileId, title, content, type, fileType, updateTime)
	}else{
		const fileId = createUTC()
		const updateTime = createUTC()
		const result = await addFileFun(id, fileId, title, content, type, fileType, updateTime);
		ctx.body = result ? true : false;
	}
	
})

router.post('/deletefile',async (ctx) => {
	const {userId,fileId} = ctx.request.body;
	const fileInfo = (await getFileById(fileId))[0]
	const result = fileInfo.user_id === userId && fileInfo.is_trash ?
	await deleteFileFun(fileId) : 
	await updateFileFun(fileId,[{keyName:'is_trash',keyValue:1}])
	ctx.body = result ? true : false;
})

router.post('/revertfile', async (ctx) => {
	const { userId, fileId } = ctx.request.body;
	const result =	await updateFileFun(fileId, [{ keyName: 'is_trash', keyValue: 0 }])
	ctx.body = result ? true : false;
})

export default router
