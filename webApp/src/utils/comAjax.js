
import axios from 'axios'
export const saveFiles = (data) => {
  const body = {
    id: global.user.id,
    title: data.title === '' ? '无标题' : data.title,
    content: data.value,
    type: data.type,
    fileType: data.fileType,
    fileId: data.fileId
  }
  axios
.post(`/api/savefile`, body)
.then((res) => {
  res.data && this.$router.push({ path: '/note/list' })
}).catch((error) => {
  console.log(error)
})
}
