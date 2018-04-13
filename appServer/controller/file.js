import Router from 'koa-router';
import {diffLines} from 'diff';
import {
	getFileList,
	getFileById,
	addFileFun,
	updateFileFun,
  deleteFileFun,
  delFileByUpTimeFun
} from '../sqls/index';
import {removeSpeciChar,createUTC} from './comDataDeal'

const router = new Router();

router.get('/api/getfilelist',async (ctx) => {
  const {id,type,isTrash,val} = ctx.query;
  const result = await getFileList(id,type,isTrash,val);
  ctx.body = result ? {
    status:true,
    list:result
  } : {
    status:false,
    msg:'请求失败'
  }
})
router.post('/api/savefile',async (ctx) => {
  const { userId,title,content,type,fileType,fileId} = ctx.request.body;
	if(fileId !== ''){
		const result = await getFileById(fileId);
    const updateTime = createUTC()
    console.log('result======================',result)
    if (result[0].user_id !== userId){
      const diffRes = diffLines(result[0].file_content, content);
      let haveConflict = false
      diffRes.forEach(part => {
        if (part.removed) {
          haveConflict = true
        }
      });
      haveConflict
      ? ctx.body = {
        status: true,
        isDiff: true,
        fileInfo: {
          ...result[0],
          file_content: diffRes
        }
      }
      : await updateFileFun([{
        keyName: 'update_user',
        keyValue: userId
      }, {
        keyName: 'file_id',
        keyValue: fileId
      }, {
        keyName: 'file_title',
        keyValue: title
      }, {
        keyName: 'file_content',
        keyValue: content
      }, {
        keyName: 'update_time',
        keyValue: updateTime
      }])
    }else if (result.length < 3 ) {
      const res = await addFileFun(userId, fileId, title, content, type, fileType, updateTime);
      ctx.body = res ? { status: true, isDiff: false } : false;
    } else {
      await delFileByUpTimeFun(result[2].update_time)
      const res = await addFileFun(userId, fileId, title, content, type, fileType, updateTime);
      ctx.body = res ? { status: true, isDiff: false } : false;
    }
		
	}else{
		const fileId = createUTC()
		const updateTime = createUTC()
		const result = await addFileFun(userId, fileId, title, content, type, fileType, updateTime);
		ctx.body = result ? {status:true,isDiff:false} : false;
	}
	
})

router.post('/api/deletefile',async (ctx) => {
	const {userId,fileId} = ctx.request.body;
	const fileInfo = (await getFileById(fileId))[0]
	const result = fileInfo.user_id === userId && fileInfo.is_trash ?
	await deleteFileFun(fileId) : 
	await updateFileFun(fileId,[{keyName:'is_trash',keyValue:1}])
	ctx.body = result ? true : false;
})

router.post('/api/revertfile', async (ctx) => {
	const { userId, fileId } = ctx.request.body;
	const result =	await updateFileFun(fileId, [{ keyName: 'is_trash', keyValue: 0 }])
	ctx.body = result ? true : false;
})

export default router
