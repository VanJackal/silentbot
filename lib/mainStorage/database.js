/**
 * This file contains logic for interacting with the database storing the MainStorage details
 */
const halls = require("./halls.json")
const lookup = []

//INIT
// Max Idx
const maxIdx = {
    grey:{
        left:halls.grey.left.length,
        right:halls.grey.right.length
    }
}
// Grey
// for an actual implementation this should probably be pre generated
for (const [i, item] of halls.grey.left.entries()) {
    lookup.push({
        path:["grey","left"],
        idx:i,
        item:item
    })
}
for (const [i, item] of halls.grey.right.entries()) {
    lookup.push({
        path:["grey","right"],
        idx:i,
        item:item
    })
}

//FUNCS
const search = async (searchTerm) => {
    const results = lookup.filter((item) => {
        return item.item.includes(searchTerm)
    })
    results.forEach((result) => {
        result.maxIdx = maxIdx[result.path[0]][result.path[1]]
    })
    return results
}

module.exports = {
    search:search
}