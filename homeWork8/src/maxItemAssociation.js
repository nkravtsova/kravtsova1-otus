function maxItemAssociation(arr) {
    if (arr) {
        const groups = new Set();
        for (const itemArray of arr) {
            if (groups.size == 0) {
                groups.add(new Set(itemArray));
            }
            else {
                for (const itemSet of groups) {
                    let addArray = false;
                    for (const itemGroups of itemSet) {
                        if (itemArray.includes(itemGroups)) {
                            itemArray.forEach(a => itemSet.add(a));
                            addArray = true;
                        }
                    }
                    if (!addArray)
                        groups.add(new Set(itemArray));
                }
            }
        }
        const result = [];
        for (const itemSet of groups)
            result.push(Array.from(itemSet).sort());
        result.sort(function (a, b) {
            return b.length - a.length || a[0].localeCompare(b[0]);
        });
        return result[0];
    }
    else {
        return "Массив не определен";
    }
}
export { maxItemAssociation };
console.log(maxItemAssociation([["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"],]));
