var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(3)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
	let accValue=initialValue;
  return asyncFunctions.reduce((p, func) => {
	  return p.then(() => {
		  return func().then((result) => {
        accValue = reduce(accValue,result);
        return accValue
      });
	  });
  }, Promise.resolve());
}


promiseReduce([fn1, fn2],function (memo, value) {
  console.log('reduce')
  return memo * value
},1).then(console.log) 
