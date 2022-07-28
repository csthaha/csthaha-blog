export default function middlewareFn(fns) {
    return function(ctx, next) {
        const chain = (i) => {
            if (i === fns.length) return
            let fn = fns[i]
            return fn(ctx, chain.bind(this, i + 1))
        }
        chain(0)
    }
}