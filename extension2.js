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
    store.dispatch({ type: "step-change", newStep: +event.target.value });
  });
});
limits.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    store.dispatch({ type: "limit-change", newLimit: +event.target.value });
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

function reducer(prevState = { count: 0, step: 1, limit: Infinity }, action) {
  switch (action.type) {
    case "increment":
      if (prevState.count + (action.step || 1) <= action.limit) {
        return {
          count: prevState.count + (action.step || 1),
          step: prevState.step,
          limit: prevState.limit,
        };
      } else {
        return {
          count: prevState.count,
          step: prevState.step,
          limit: prevState.limit,
        };
      }
    case "decrement":
      return {
        count: prevState.count - (action.step || 1),
        step: prevState.step,
        limit: prevState.limit,
      };
    case "reset":
      return { count: 0, step: 1, limit: Infinity };
    case "step-change":
      return {
        count: prevState.count,
        step: action.newStep,
        limit: prevState.limit,
      };
    case "limit-change":
      return {
        count: prevState.count,
        step: prevState.step,
        limit: action.newLimit,
      };
    default:
      return prevState;
  }
}
