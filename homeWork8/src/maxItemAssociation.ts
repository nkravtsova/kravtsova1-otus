function maxItemAssociation(arr: string[][]){

	if (arr){

	  let groups = new Set<Set<string>>();
	  for (let itemArray of arr){

		if (groups.size == 0) {
		  groups.add(new Set<string>(itemArray));

		} else {

		  for (let itemSet of groups){
			let addArray = false; 
			for (let itemGroups of itemSet){
			  if (itemArray.includes(itemGroups)){
				itemArray.forEach(a => itemSet.add(a));
				addArray = true;
			  }
			}
			if (!addArray) groups.add(new Set(itemArray));
		  }
		}
	  }

		let result:string[][] = [];

		for (let itemSet of groups) result.push(Array.from(itemSet).sort());
		result.sort(function(a:string[], b:string[]):number {
			return b.length - a.length || a[0].localeCompare(b[0]);
		  });

		return result[0];

	} else {

		return "Массив не определен"
  }
}

console.log(maxItemAssociation([["q", "w", 'a'],["a", "b"],["a", "c"],["q", "e"],["q", "r"],]))