#!/usr/bin/env node
var
  assert= require( "assert"),
  multiProp= require( ".."),
  json = "{a: 1, b: 2, c: 3, b: 4, d: 5, b: 6}",
  parsed= multiProp(json),
  expected= {a: 1, b: [2, 4, 6], c: 3, d: 5}

assert.deepEqual(parsed, expected)
