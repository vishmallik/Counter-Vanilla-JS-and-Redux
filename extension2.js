let counter = document.querySelector(".counter");
let increment = document.querySelector(".inc");
let decrement = document.querySelector(".dec");
let reset = document.querySelector(".reset");
let steps = document.querySelectorAll(".step-btn");
let limits = document.querySelectorAll(".limit-btn");

let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let step = store.getState().step;
let count_value = store.getState().count;
let limit = store.getState().limit;
counter.innerText = count_value;

steps.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    store.dispatch({ type: "step-change", payload: +event.target.value });
  });
});
limits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    store.dispatch({ type: "limit-change", payload: +event.target.value });
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
  limits.forEach((btn) => {
    if (limit == btn.value) {
      btn.classList.add("active-limit");
    } else {
      btn.classList.remove("active-limit");
    }
  });
}

increment.addEventListener("click", () => {
  store.dispatch({ type: "increment", step, limit });
});
decrement.addEventListener("click", () => {
  store.dispatch({ type: "decrement", step, limit });
});
reset.addEventListener("click", () => {
  store.dispatch({ type: "reset", step, limit });
});
store.subscribe(() => {
  count_value = store.getState().count;
  counter.innerText = count_value;
  step = store.getState().step;
  limit = store.getState().limit;
  activeClass();
});

function reducer(state = { count: 0, step: 1, limit: Infinity }, action) {
  switch (action.type) {
    case "increment":
      // if (state.count + (action.step || 1) <= action.limit) {
      //   return {
      //     count: state.count + (action.step || 1),
      //     step: state.step,
      //     limit: state.limit,
      //   };
      // } else {
      //   return {
      //     count: state.count,
      //     step: state.step,
      //     limit: state.limit,
      //   };
      // }
      return {
        ...state,
        count:
          state.count + (action.step || 1) <= action.limit
            ? state.count + (action.step || 1)
            : state.count,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - (action.step || 1),
      };

    case "reset":
      return { count: 0, step: 1, limit: Infinity };

    case "step-change":
      return {
        ...state,
        step: action.payload,
      };
    case "limit-change":
      return {
        ...state,
        limit: action.payload,
      };
    default:
      return state;
  }
}
