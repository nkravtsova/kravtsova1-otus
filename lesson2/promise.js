var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(3)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
  return asyncFunctions.reduce((p, func) => {
	  let accValue=initialValue;
	  return p.then(function(value) {
		return func().then(reduce(accValue,value));
	  });
  }, Promise.resolve());
}


promiseReduce([fn1, fn2],function (memo, value) {
  console.log('reduce')
  return memo * value
},1).then(console.log) 