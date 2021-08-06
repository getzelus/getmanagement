
import settings from './settings';

const server = settings.server;

const headerToken = () => {
 // let localToken = settings.getToken();
  let newHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    //'x-auth-token': localToken
   };
   return newHeader;
}

const end = (res) => {
    if (!res.ok) {
        res = {error: res.status}
    }else {
        res = res.json();
    }
    return res;
}

const get = async (url) => {
  let res = await fetch(
      server + url,
      {
        method: 'GET',
        headers: headerToken()
      }          
  ); 
  return end(res);
}

const post = async (url, payload) => {
    let res = await fetch(server + url, {
        method: 'POST',
        headers: headerToken(),
        body: JSON.stringify(payload)
    });
    return end(res);
}

const patch = async (url, payload) => {
    let res = await fetch(server + url, {
        method: 'PATCH',
        headers: headerToken(),
        body: JSON.stringify(payload)
    });
    return end(res);
}

const deletez = async (url, payload) => {
    let res = await fetch(server + url, {
        method: 'DELETE',
        headers: headerToken(),
        body: JSON.stringify(payload)
    });
    return end(res);
}



const upload = async (url, payload) => {  
    let formData = new FormData();
    for (const k in payload) {
        formData.append(k, payload[k]);
    }
  
     let res = await fetch(server + url, {
        method: 'POST',
        body: formData
    });
    return end(res);
}

const req = {};
req.get = get;
req.post = post;
req.patch = patch;
req.deletez = deletez;

req.upload = upload;

export default req;


