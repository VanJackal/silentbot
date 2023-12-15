/**
 * This file contains logic for interacting with the database storing the MainStorage details
 */
const halls = require("./halls.json")
const lookup = []

//INIT
// Max Idx
const maxIdx = {
    white:{
        left:halls.white.left.length,
        right:halls.white.right.length
    },
    black:{
        left:halls.black.left.length,
        right:halls.black.right.length
    },
    grey:{
        left:halls.grey.left.length,
        right:halls.grey.right.length
    }
}
// white
// for an actual implementation this should probably be pre generated
for (const [i, item] of halls.white.left.entries()) {
    lookup.push({
        path:["white","left"],
        idx:i,
        item:item
    })
}
for (const [i, item] of halls.white.right.entries()) {
    lookup.push({
        path:["white","right"],
        idx:i,
        item:item
    })
}
// black
for (const [i, row] of halls.black.left.entries()) {
    for(const [j, item] of row.entries()){
        lookup.push({
            path:["black","left",i+1],
            idx:j,
            item:item
        })
    }
}
for (const [i, row] of halls.black.right.entries()) {
    for(const [j, item] of row.entries()){
        lookup.push({
            path:["black","right",i+1],
            idx:j,
            item:item
        })
    }
}
// grey
for (const [i, row] of halls.grey.left.entries()) {
    for(const [j, item] of row.entries()){
        lookup.push({
            path:["grey","left",i+1],
            idx:j,
            item:item
        })
    }
}
for (const [i, row] of halls.grey.right.entries()) {
    for(const [j, item] of row.entries()){
        lookup.push({
            path:["grey","right",i+1],
            idx:j,
            item:item
        })
    }
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