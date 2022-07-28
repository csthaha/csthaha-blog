const forEachFn = (target = {}, cb) => {
    Object.keys(target).forEach(key => {
        cb(target[key], key)
    })
}

export {
    forEachFn
}