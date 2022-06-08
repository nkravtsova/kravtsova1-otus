const fs = require('fs');
const { readdir } = require('fs').promises;

let path = (process.argv[2] == 'path' ?  './': process.argv[2]);

async function tree(source, obj_dirs_files = {dirs : [],files : []}) {
	
	let structureOfDir = await readdir(source, { withFileTypes: true });
	for (let fileOrDir of structureOfDir){
		path = source + fileOrDir.name;
		  
		if (fileOrDir.isDirectory()) {
			path += '/'; 
			obj_dirs_files.dirs.push((path.startsWith('./') ? path.substr(2): path));
			
			await tree(path,obj_dirs_files) ;
		} else {
			
			obj_dirs_files.files.push((path.startsWith('./') ? path.substr(2): path));
		}
	}
	return obj_dirs_files;
  }
  
function printItem(item, step, isFile) {
	console.log(step + '--' + item + (isFile ? '': '/'));
	return (isFile ? '': '|') + step
}


tree(path).then(obj_dirs_files => {
	obj_dirs_files.dirs.sort((a, b) =>(a > b) ? 1 : (b > a ? -1 : 0));
	obj_dirs_files.files.sort((a, b) =>(a > b) ? 1 : (b > a ? -1 : 0));
	return obj_dirs_files
})
.then(obj_dirs_files => {
	if (process.argv[2] == 'path' ) {
		let arrDirsFiles = obj_dirs_files.dirs.concat(obj_dirs_files.files);
		
		arrDirsFiles.sort((a, b) =>(a > b) ? 1 : (b > a ? -1 : 0));
		
		let arrPath = [];
		let arrPathStandart = [];
		let arrFiles = [];
		
		
		let beginPath = '/';
		let step = '|'
		for (let file of arrDirsFiles) {
			let isFile = (file.slice(-1) == '/'? false: true);
			
			if (!isFile) file = file.substr(0, file.length-1);
			
			if (file.startsWith(beginPath)) {
				arrPath = file.substr(beginPath.length).split('/');
				for (let i = 0; i <= arrPath.length-1; i++ ) {
					step = printItem(arrPath[i], step, isFile);
				}
				

			} else {
				arrPath = file.split('/');
				step = '|';			
				for (let i = 0; i <= arrPath.length-1; i++ ) {
					if (arrPathStandart.length-1 < i || arrPathStandart[i] !== arrPath[i]){
							step = printItem(arrPath[i], step, isFile);
						} else {
							step = '|' + step;
						}
				}
				arrPathStandart = arrPath;
			}
			if (!isFile) beginPath = file + '/';
		}
		
	} else {
		console.log(obj_dirs_files);
	}
	
})
.catch(err => {
    console.log(err);
});
