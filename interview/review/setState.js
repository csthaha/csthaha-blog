function useState(initValue) {
    let state = {
        a:1
    }
    const set =(value) => {
        state .a = value
    }


  return [state, set]
}

const [state,set] = useState(1) // []
set(3)
console.log(state.a)