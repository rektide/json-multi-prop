var
  clarinet= require( "clarinet"),
  through2= require( "through2")

function JsonMultiProps(str){
	return new Promise( function( resolve, reject){
		var
		  parser= clarinet.createStream(),
		  key,
		  stack= []
		function append( o){
			if( key!== undefined){
				stack[ stack.length- 1][key]= o
			}else if( stack.length!== 0){
				stack[ stack.length- 1].push( o)
			}else{
				stack.push(o)
			}
		}
		parser.on( "value", function( v){
			if( stack.length=== 0){
				return resolve( v)
			}
			append( v)
		})
		parser.on( "openobject", function(k){
			append( {})
			key= k
		})
		parser.on( "closeobject", function(){
			var v= stack.pop()
			if( stack.length=== 0){
				return resolve( v)
			}
			key= undefined
		})
		parser.on( "key", function(k){
			key= k
		})
		parser.on( "openarray", function(){
			append( [])
		})
		parser.on( "closearray", function(){
			var v= stack.pop()
			if( stack.length=== 0){
				return resolve( v)
			}
		})
		parser.on( "error", function( err){
			reject( err)
		})
		parser.end( str)
	})
}


module.exports= JsonMultiProps
