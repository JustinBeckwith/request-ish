import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Request, RequestCallback, RequestResponse} from 'request';

const baseConfig: AxiosRequestConfig = {
  validateStatus: status => true
};

export function request(url: string, callback: RequestCallback): void {
  const options: AxiosRequestConfig = {url, method: 'get'};
  ax(options, callback);
}

function ax(options: AxiosRequestConfig, callback: RequestCallback) {
  options = Object.assign(options, baseConfig);
  axios(options).then(
      r => {
        const rr = convertResponse(r);
        callback(null, rr, rr.body);
      },
      (e: AxiosError) => {
        if (e.response) {
          const rr = convertResponse(e.response);
          callback(e, rr, rr.body);
        } else {
          callback(e, null!, null!);
        }
      });
}

function convertResponse(o: AxiosResponse): RequestResponse {
  const res = {
    statusCode: o.status,
    statusMessage: o.statusText,
    request: o.request,
    body: o.data
  } as {} as RequestResponse;
  return res;
}
