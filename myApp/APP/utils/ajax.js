
const fetchJSON = (url,params) => {
  params = {
    ...params,
    headers:{
      'Content-Type':'application/json',
    }
  };
  return fetch(url,params);
};
export const fetchJSONByGet = url => (query) => {
  const params = {
    method:'GET',
  };
  let getQuery = '?';
  if(query){
    //eslint-disable-next-line
		for(name in query){
      getQuery = `${getQuery}${name}=${query[name]}&`;
    }
  }
  const getUrl = (`${global.IP}/${url}${getQuery}`).replace(/&$/,'');
  return fetchJSON(getUrl,params);
};

export const fetchJSONByPost = url => body => {
  const params = {
    method:'POST',
    body:JSON.stringify(body)
  };
  return fetchJSON(`${global.IP}/${url}`,params);
};