# React Redux 분석

# 기본 흐름

react-redux에서 관리하는 subscription 객체에서 redux store에 listener를 등록
component mount 당시 useSelector를 통해서 subscription 객체에 listener(handleStoreChange) 등록
handleStoreChange는 이전 state, selection 값과 현재 state, selection 값을 비교하고 다르다면 해당 component re-render

결론: useSelctor로 관심 가지는 상태가 변하면 해당 Component는 re-render 된다.

# Provider.tsx

1. redux subscribe에 handleChangeWrapper(Subscription) 함수 등록 해당 함수는 내부에서 관리하는 listerner 목록을 순차적으로 실행
2. redux 상태 변경 시 Subscription은 가지고 있는 listener에게 알림

# useSelector.ts

최적화 함수 제공

- prev state / current state 비교
- prev selection/ current selection 비교

1. component mount 단계에서 react-dom에서 만든 handleStoreChange를 subscription의 listener로 등록
2. redux state 변경으로 인해 listener가 실행 되면 handleStoreChange 함수를 통해 useSelector에서 제공하는 함수를 통해 state 비교 및 selection 값을 비교 하여 rendering 여부 판단

useSelector -> useSyncExternalStoreWithSelector -> useSyncExternalStore

useSelector

- selector, isEqual 함수 받기

useSyncExternalStoreWithSelector

- memoizedSelector 생성 (state, selection 값 저장(memoization))

useSyncExternalStore

- react에서 처리 하는 로직(effect, hook 관련)
- subscription에 listener(handleStoreChange) 등록
- handleStoreChange는 state, selection 값이 바뀐 경우 해당 컴포넌트 re-render

# TIP

다음 코드의 경우 useSelector에 항상 새로운 reference의 selector 함수를 넘겨주므로 memoizedSelector를 새로 만듦

```typescript
const SecondValue = () => {
  const secondNumber = useSelector((state: RootState) => state.secondNumber)

  return <div>Second value: {secondNumber}</div>
}
```
