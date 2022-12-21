# React Redux 분석

# Provider.tsx

1. redux subscribe에 handleChangeWrapper(Subscription) 함수 등록 해당 함수는 내부에서 관리하는 listerner 목록을 순차적으로 실행
2. redux 변경 시 listener 목록 실행

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