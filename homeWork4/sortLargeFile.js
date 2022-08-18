const fs = require("fs");
const { pipeline } = require("node:stream");
const readline = require("node:readline");
const path = require("path");

const unsortedLargeFile = path.join(__dirname,'unsortedLarge.txt');
const sortedLargeFile = path.join(__dirname,'sortedLarge.txt');
 
const inputStream = fs.createReadStream(unsortedLargeFile,{encoding:'utf8', highWaterMark: 5242880});
const outputStream = fs.createWriteStream(sortedLargeFile);

let lastElArrayFromChunk = '';
let indexLastElArrayFromChunk;
			
let indexFile = 1;
let arrayWithFiles = [];

function generateArrayInt() {
	let arrInt = [];
	for (let i = 0; i < 1024; i++) {
		arrInt.push(Math.floor(Math.random()*(99999999991)));
	}
	return arrInt
}

function generateFileWithInt() {
	let fileWithInt = fs.openSync(unsortedLargeFile, 'w');
	let currentSize = 0;
	console.log(`Start generate large file with int. Wait...`);
	do {
		fs.writeSync(fileWithInt, generateArrayInt().join('\n') + '\n');
		currentSize = fs.statSync(unsortedLargeFile).size/(1024*1024);
	}
	while (currentSize < 100)
	console.log(`Get large file with int`);
		
}

async function generateSmallSortedFile(chunk, lastIteration) {
	let arrayFromChunk = [];
	if (!lastIteration) {
		arrayFromChunk = chunk.split('\n').map(Number);
		
		indexLastElArrayFromChunk = arrayFromChunk.length-1;
		lastElArrayFromChunk = arrayFromChunk[indexLastElArrayFromChunk];
		arrayFromChunk.length = indexLastElArrayFromChunk;
		
		arrayFromChunk.sort((a,b) => a-b)
	} else {
		arrayFromChunk[0] = chunk;
	}
	
	arrayWithFiles.push(`tempSorted${indexFile}.txt`);
	fs.writeFile(`tempSorted${indexFile}.txt`, arrayFromChunk.join('\n'), function(err){
		if (err) {
			return console.log(err)
		}
	});
	indexFile++;
}

function getStreamIterators(arrayWithFiles) {
	let arrayIterators = [];
	arrayWithFiles.forEach((file) => {
		arrayIterators.push(readline.createInterface({input: fs.createReadStream(file)})[Symbol.asyncIterator]())
	})
	return arrayIterators;
}

async function getSortedLargeFile() {
	generateFileWithInt()
	
	await pipeline(
	
		inputStream, 
		
		async function* (source, {signal}) {
			
			console.log(`Start generate temp small sorted files with int`);
					
			for await (let chunk of source) {
				chunk = lastElArrayFromChunk + chunk;
				generateSmallSortedFile(chunk, false);
			}
			if (lastElArrayFromChunk) generateSmallSortedFile(lastElArrayFromChunk, true);	
			console.log(`Get temp small sorted files with int`);

			console.log(`Start generate large file with sorted int. Wait...`);
			let arrayStreamIterators = await getStreamIterators(arrayWithFiles) 
			let arrayItemStreamIterators = []
		  
			for (let itemStream of arrayStreamIterators){
				let nextItemStream = await itemStream.next()
				arrayItemStreamIterators.push(Number(nextItemStream.value))
			}
		 
		 
			while (true){
				let minOfItemsStream = Math.min(...arrayItemStreamIterators)
				let indexOfMinOfItemsStream =arrayItemStreamIterators.indexOf(minOfItemsStream)
				
				yield minOfItemsStream+'\n'
				
				let nextItemStream = await arrayStreamIterators[indexOfMinOfItemsStream].next()
				if (nextItemStream.done) {
					arrayItemStreamIterators.splice(indexOfMinOfItemsStream,1)
					arrayStreamIterators.splice(indexOfMinOfItemsStream,1)
				} else {
					arrayItemStreamIterators.splice(indexOfMinOfItemsStream,1,Number(nextItemStream.value))
				}
				if (arrayStreamIterators.length == 0) break;
			}


			console.log(`Start delete temp small files. Wait...`);
			for (let file of arrayWithFiles){
				fs.unlink(file, (err) => {
					if (err) throw err;
				})
			}
			console.log(`Done delete temp small files.`);
		}, 
		
		outputStream,
		
		(err) => {
			if (err)
			  console.error('Proccess failed.', err);
			else
			  console.log('Get large file with sorted int');
		  }
		);

	
}

getSortedLargeFile().catch(console.log);