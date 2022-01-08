'use strict';

const formatMessage = require('../../helpers/formatMessage');

describe('formatMessage testing', ()=>{
  it('returns object with proper shape', ()=>{
    const username = 'Liubochka bubochka';
    const text = 'hee)';
    const actual = formatMessage(username, text);

    const expected = {
      username,
      text,
      time: expect.any(String),
    };
    expect(actual).toEqual(expected);
  });
});