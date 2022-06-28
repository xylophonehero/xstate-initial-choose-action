import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMachine, assign , actions} from "xstate";
import { useMachine } from "@xstate/react";
const {choose}= actions

interface ToggleContext {
  count: number;
}

const toggleMachine = createMachine({
  tsTypes: {} as import("./index.typegen").Typegen0,
  schema: {
    context: {} as ToggleContext,
    events: { type: 'TOGGLE'}
  },
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  entry: choose([
    {
      cond: 'someCondition',
      actions: 'someAction'
    }
  ]),
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: [
        assign({ count: (ctx) => ctx.count + 1 }), 
        // Uncomminting out the below lines removes the error
        // choose([
        //   {
        //     cond: 'someCondition',
        //     actions: 'someAction'
        //   }
        // ])
      ],
      on: { TOGGLE: "inactive" }
    }
  }
});

function App() {
  const [current, send] = useMachine(toggleMachine, {
    actions: {
      someAction: ()=>console.log('hello')
    },
    guards: {
      someCondition: ()=>true,
    }
  });
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
