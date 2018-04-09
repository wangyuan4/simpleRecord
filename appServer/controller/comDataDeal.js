export const removeSpeciChar = (str,char) => {
	const index = str.charAt(char)
	return str.split(',').spilce(index,1).join(',')
}

export const createUTC = () => Math.round(new Date().getTime()/1000)
