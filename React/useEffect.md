ref: https://reactjs.org/docs/hooks-effect.html

## useEffect의 실행 시점

다음과 같은 useEffect의 경우  
render(mount, update)시 마다 해당 effect가 실행이 된다.

```typescript
const [count, setCount] = useState(0)

useEffect(() => {
  console.log("effect" + count)
})
```

## clean up 실행 시점

clean up이 실행되는 경우

1. component unmount 시점
2. 새로운 effect가 등록되는 경우 이전 effect의 clean up 함수 실행

아래 예시의 경우 처음 render(mount)될 때 effect 0 출력  
count가 변하는 경우 clean up 0 출력 이후  
effect 1 출력

따라서 render(mount, update)로 인해 effect를 실행하는 경우 이전 effect의 clean up을 먼저 실행 해준다.

```typescript
const [count, setCount] = useState(0)

useEffect(() => {
  console.log("effect " + count)
  return () => {
    console.log("clean up " + count)
  }
})
```

## effect 최적화

useEffect의 두 번째 파라미터로 의존성을 주입하여 원하는 render에서 실행 시킬 수 있다.

render될 때 count가 바뀌었다면 이전에 effect에서 등록된 clean up 함수 실행 후 현재 새로운 effect 함수 실행

name의 변화로 인해 re-render되는 경우에는 effect가 실행되지 않는다.

```typescript
const [count, setCount] = useState(0)
const [name, setName] = useState("choi")
useEffect(() => {
  console.log("effect " + count)
  return () => {
    console.log("clean up " + count)
  }
}, [count])
```
