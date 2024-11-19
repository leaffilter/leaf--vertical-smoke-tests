import * as https from 'node:https';
import * as process from 'node:process';

async function getHeaders(url) {
  return new Promise((resolve) => {
    let headers = {};
    const newUrl = new URL(url);
    const options = {
      method: 'HEAD',
      host: newUrl.host,
      path: newUrl.pathname || '/',
    };
  
    const request = https.request(options, (response) => {
      headers = response.headers;
      return resolve(headers);
    });
    request.on('error', err => rejects(err));
    request.end();  
  });
}

async function getLocation() {
  const masterUrl = 'https://google.com';
  try {
    const headers = await getHeaders(masterUrl);
    console.log('location', headers.location);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

getLocation();
