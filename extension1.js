let counter = document.querySelector(".counter");
let increment = document.querySelector(".inc");
let decrement = document.querySelector(".dec");
let reset = document.querySelector(".reset");
let steps = document.querySelectorAll(".step-btn");

let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let step = store.getState().step;

let count_value = store.getState().count;
counter.innerText = count_value;

steps.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    store.dispatch({ type: "step-change", payload: +event.target.value });
  });
});

function activeClass() {
  steps.forEach((btn) => {
    if (step == btn.value) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

increment.addEventListener("click", () => {
  store.dispatch({ type: "increment", step });
});
decrement.addEventListener("click", () => {
  store.dispatch({ type: "decrement", step });
});
reset.addEventListener("click", () => {
  store.dispatch({ type: "reset", step });
});
store.subscribe(() => {
  count_value = store.getState().count;
  counter.innerText = count_value;
  step = store.getState().step;
  activeClass();
});

function reducer(state = { count: 0, step: 1 }, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + (action.step || 1) };
    case "decrement":
      return { ...state, count: state.count - (action.step || 1) };
    case "reset":
      return { count: 0, step: 1 };
    case "step-change":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}
