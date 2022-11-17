let counter = document.querySelector(".counter");
let increment = document.querySelector(".inc");
let decrement = document.querySelector(".dec");
let reset = document.querySelector(".reset");

let store = Redux.createStore(reducer);

let count_value = store.getState();
counter.innerText = count_value;

increment.addEventListener("click", () => {
  store.dispatch({ type: "increment" });
});
decrement.addEventListener("click", () => {
  store.dispatch({ type: "decrement" });
});
reset.addEventListener("click", () => {
  store.dispatch({ type: "reset" });
});
store.subscribe(() => {
  count_value = store.getState();
  counter.innerText = count_value;
});

function reducer(state = 0, action) {
  switch (action.type) {
    case "increment":
      return state + (action.step || 1);
    case "decrement":
      return state - (action.step || 1);
    case "reset":
      return (state = 0);
    default:
      return state;
  }
}
