const db = require("./database")

const getItem = async (search) => {
    const results = await db.search(search)
    results.forEach((result) => {
        result.msg = `${result.item} -> ${result.path.join(" ")}, ${getRelativePos(result.idx, result.maxIdx)} (${result.idx} from front)`
    })
    return results
}

const getRelativePos = (idx, maxIdx) => {
    const ratio = idx/maxIdx
    if (idx === 0){
        return "At the start of the hall"
    } else if (idx === maxIdx) {
        return "At the end of the hall"
    } else if (ratio < 0.3) {
        return "Near the start of the hall"
    } else if (ratio < 0.6) {
        return "In the middle of the hall"
    } else {
        return "Near the end of the hall"
    }
}

module.exports = {
    getItem:getItem
}