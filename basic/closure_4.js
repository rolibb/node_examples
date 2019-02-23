function outside() {
  let x = 2
  return function inside(y) {
    return x * y
  }
}

console.log(outside()(4));
