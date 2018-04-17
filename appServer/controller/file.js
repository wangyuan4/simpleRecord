import Router from 'koa-router'
import {diffLines} from 'diff'
import multer from 'koa-multer'
import {
	getFileList,
	getFileById,
	addFileFun,
	updateFileFun,
  deleteFileFun,
  delFileByUpTimeFun
} from '../sqls/index';
import {removeSpeciChar,createUTC} from './comDataDeal'

const router = new Router()
const storage = multer.diskStorage({
  //文件保存路径  
  // destination: function (req, file, cb) {
  //   cb(null, 'public/uploads/')
  // },
  //修改文件名称  
  // filename: function (req, file, cb) {
  //   var fileFormat = (file.originalname).split(".");
  //   cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  // }
})  
const upload = multer({ storage: storage })

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

router.get('/api/getfileinfo', async (ctx) => {
  const { fileId } = ctx.query;
  const result = await getFileById(fileId);
  ctx.body = result ? {
    status: true,
    list: result
  } : {
      status: false,
      msg: '请求失败'
    }
})

router.post('/api/savefile',async (ctx) => {
  const { userId,title,content,type,fileType,fileId} = ctx.request.body;
	if(fileId !== ''){
		const result = await getFileById(fileId);
    const updateTime = createUTC()
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
          diffRes
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
    }else if (result.length < 4 ) {
      const res = await addFileFun(userId, fileId, title, content, type, fileType, updateTime);
      ctx.body = res ? { status: true, isDiff: false } : false;
    } else {
      await delFileByUpTimeFun(result[3].update_time)
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

router.post('/api/savemedia', upload.single('file'), async (ctx) => {
  // const { userId, title, content, type, fileType, fileId } = ctx.request.body;
  console.log(ctx.req.file)
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
