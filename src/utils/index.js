export function deepFind(arr, id) {
    console.log(id)
    if (Array.isArray(arr)) {
        return deepFindSub(arr, id)
    } else {
        return false
    }
}
export function alertMessage(msg,status){
    this.$message({
        type:status,
        message:msg
    })
}


let res = null //TODO
function deepFindSub(arr, id) {
    console.log('arr', arr)
    arr.forEach(item => {
        if (item.subComment.length > 0) {
            res = deepFindSub(item.subComment, id)
        }
        if (item.id === id) {
            console.log(item)
            res = item
        }
    })
    return res
}