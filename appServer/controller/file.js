import Router from 'koa-router';
import {diffLines} from 'diff';
import {
	getFileList,
	getFileById,
	addFileFun,
	updateFileFun,
	deleteFileFun
} from '../sqls/index';
import {removeSpeciChar,createId} from './comDataDeal'

const router = new Router();

router.get('/getFileList',async (ctx) => {
    const {id,type} = ctx.query;
		const result = await getFileList(id,type);
    ctx.body = result ? {
			status:true,
			list:result
		} : {
			status:false,
			msg:'请求失败'
		}
})
router.post('/addFile',async (ctx) => {
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
		const {id,title,content,type,fileId} = ctx.request.body;
		console.log(title,content,fileId)
    if(fileId !== ''){
			const result = await getFileById(fileId);
			const diffRes = diffLines(result[0].file_content,content);
			let haveConflict = false
			diff.forEach(part => {
					if(part.removed){
						haveConflict = true
					}
				});
			haveConflict ? ctx.body = diffRes : await updateFileFun(id,fileId,title,content)
    }else{
			const fileId = createId()
			const result = await addFileFun(id,fileId,title,content,type);
    	ctx.body = result ? true : false;
    }
	
})

router.post('/deleteFile',async (ctx) => {
		const {userId,fileId} = ctx.request.body;
		const fileInfo = (await getFileById(fileId))[0]
		const result = fileInfo.length && fileInfo.user_id === userId ?
		await deleteFileFun(fileId) :
		await updateFileFun(fileId,[{keyName:'suser_id',keyVal:removeSpeciChar(fileInfo.suser_id,userId)}])
		ctx.body = result ? true : false;
})

export default router
