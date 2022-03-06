# Reselect

redux store state를 최소로 유지하면 다음과 같은 이점이 있습니다.
1\. 읽기 쉽고 관리하기 편하다\.
2\. state가 update될 때 마다 만들어지는 파생 변수를 동기화 하지 않아도 된다\.

따라서 state는 최소로 유지하고 파생 변수는 아래와 같이 만들고는 합니다.

```typescript
// reducer.ts
const initialState = {
  todos: [
    {
      text: "test1",
      completed: true,
    },
    {
      text: "test2",
      completed: false,
    },
  ],
};
/* 중략 */
```

```typescript
// TodoList.tsx
function TodoList() {
  const todos = useSelector(state => state.todos);
  const completedTodos = todos.filter(todo => todo.completed); /* 중략 */
}
```

하지만 이 패턴에는 몇 가지 문제점이 있습니다.

1\. 각 컴포넌트에서 state 구조를 알고 있습니다\.
    - 이는 state 구조 변경 시 state 구조에 관심을 가지는 모든 컴포넌트를 수정해야 합니다.
2\. todos의 값이 변경되지 않아도 completedTodos는 항상 새로운 reference를 가지게 됩니다\.
    - 이를 사용하는 컴포넌트는 항상 re-render 됩니다.

# Selector 함수 생성 및 createSelector를 통한 개선

```typescript
export const selectTodos = state => state.todos;

export const selectCompletedTodos = createSelector(selectTodos, todos => {
  return todos.filter(todo => todo.completed);
});
```

이를 통해 다음과 같은 이점이 생깁니다.

1. 더 이상 특정 state를 필요로 하는 각 컴포넌트에서 state 구조에 신경쓰지 않습니다.(캡슐화)
2. todos의 값이 변경되지 않으면 똑같은 reference를 반환합니다.

## createSelector (Memoizd Selectors)

createSelector API에 대해 먼저 알아 보겠습니다.  
파라미터는 input selector와 output selector로 나뉘며 input selector는 n개 주입할 수 있으며 마지막 함수가 ouput selector가 됩니다.

ouput selector의 파라미터로 전달되는 값은 각 input selector의 반환 값입니다.

```typescript
export const selectTodos = state => state.todos;

export const selectCompletedTodos = createSelector(selectTodos, todos => {
  // 이 output selector에 들어오는 todos는 input selector인 selectTodos가 반환하는 값입니다.
  return todos.filter(todo => todo.completed);
});
```

output selector에 전달되는 매개변수의 referece가 최근 cache된 것과 일치하면 이미 생성된 값을 반환합니다.

```typescript
selectCompletedTodos(state); // 첫 호출이므로 output selector를 호출하고 전달된 파라미터의 reference를 cache 합니다.
selectCompletedTodos(state); // state 값이 변하지 않았으므로 이미 저장된 output selector의 반환 값을 가지고 옵니다.
```

참고 URL: https://redux.js.org/usage/deriving-data-selectors  
Sun, Mar 6, 2022 6:29 PM
