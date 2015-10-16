#!/usr/bin/env node
var
  assert= require( "assert"),
  multiProp= require( ".."),
  json = '{"a": 1, "b": 2, "c": 3, "b": 4, "d": 5, "b": 6}',
  parse= multiProp(json),
  expected= {a: 1, b: [2, 4, 6], c: 3, d: 5}

parse.then(function( parsed){
	assert.deepEqual(parsed, expected)
	console.log( JSON.stringify(parsed))
}).catch(function( err){
	console.log(err)
	process.exit(1)
})
