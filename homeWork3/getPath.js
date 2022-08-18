function getPath(currentEl){
	let path = '';

	while (currentEl) {
		path = currentEl.tagName.toLowerCase() + ':nth-child(' + (+Array.from(currentEl.parentNode.children).indexOf(currentEl) + 1) + ')>' + path;

	  currentEl = currentEl.parentNode; 
	  if (currentEl.tagName == 'HTML') break;
	}
	
	return path.substr(0,path.length-1);
}  

module.exports = getPath;