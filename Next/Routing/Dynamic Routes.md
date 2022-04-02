https://nextjs.org/docs/routing/dynamic-routes

# Dynamic Routes

- []를 통해 dynamic route를 만들 수 있다. slug라고 부르기도 함 ex) `[param]`

## URL

- URL parmeter는 router.query에서 가져올 수 있습니다.

- `/post/1`, `/post/abc` -> { "pid": "1" }, { "pid": "abc" }
- `/post/abc?foo=bar` query string도 가져올 수 있다. -> { "foo": "bar", "pid": "abc" }
- route parameter와 query string 이름이 같은 경우 router parameter로 재정의 됩니다. `/post/abc?pid=123` -> { "pid": "abc" }

- Multiple Dynamic Route도 똑같습니다. `pages/post/[pid]/[comment].js ` ex. `/post/abc/a-comment` -> { "pid": "abc", "comment": "a-comment" }

```typescript
// pages/post/[pid].js
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};

export default Post;
```

## Catch all routes

- 모든 paths를 처리하도록 할 수 있다. ex. `pages/post/[...slug].js`
- `/post/a`, `/post/a/b`, `/post/a/b/c`, etc... -> { "slug": ["a"] }, { "slug": ["a", "b"] }, etc...

## Optional catch all routes

- `pages/post/[[...slug]].js` Catch all routes와의 차이점은 parmeter 값이 없어도 route 된다. ex. `/post` -> {}
