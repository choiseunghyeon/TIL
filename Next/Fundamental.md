# Next.js는 React Library를 사용한다.

## ReactDOMServer

### renderToString

- React Element의 초기 HTML을 렌더링하여 HTML 문자열을 반환한다. 이미 서버 렌더링 된 마크업이 있는 노드에서 ReactDOM.hydrate()를 호출할 경우 React는 이를 보존하고 이벤트 핸들러만 연결하여 뛰어난 첫 로드 성능을 보여준다.

### renderToStaticMarkup

- data-reactroot와 같이 React에서 내부적으로 사용하는 추가적인 DOM attribute를 만들지 않는다. 약간의 바이트를 절약할 수 있지만 React를 사용한 Interaction이 되지 않는다. 즉 ReactDOM.hydrate가 안되며 간단한 정적 페이지 생성기로만 사용할 수 있다.

## ReactDom

### Hydrate

```typescript
ReactDOM.hydrate(element, container[, callback])
```

render와 동일하지만 HTML 콘텐츠가 ReactDOMServer로 렌더링 된 컨테이너에 이벤트를 보충하기 위해 사용
