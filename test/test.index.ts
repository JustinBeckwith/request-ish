import assert from 'assert';
import nock from 'nock';

import {request} from '../src';

const url = 'https://fake.local';
function mock() {
  return nock(url).get('/').reply(200, {});
}

it('should make a simple request', done => {
  const scope = mock();
  request(url, (err, res, body) => {
    assert.ifError(err);
    scope.done();
    done();
  });
});
