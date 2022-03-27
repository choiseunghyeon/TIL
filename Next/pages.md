https://nextjs.org/docs/basic-features/pages

- page folder 하위에 filename으로 Url 접근이 가능하다.
  - pages/about.js / url: /about

## Pre-rendering

    - HTML 구조를 만들고 최소한의 JS를 포함한다. 추후 브라우저에서 렌더링 되고 JS가 실행되며 Interactive 하게 만들어준다.(hydration)

Static Generation - Build 타임에 생성 / 성능 이점
Server-side Rendering - 요청 마다 HTML 생성
Client-side Rendering

## Static Generation with data

- page content가 외부 데이터에 의존하는 경우 getStaticProps

같은 파일에 작성한다.  
getStaticProps 예시

```typescript
// 사용 방법
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
```

- page paths가 외부 데이터에 의존하는 경우 getStaticPaths  
  dynamic routes가 되는 page를 생성할 수 있다. ex) pages/posts/[id].js / url: posts/1

```typescript
function Post({ post }) {
  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map(post => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
```

## User Request가 없더라도 pre-render할 수 있다면 Static Generation을 사용하라

- 요청 별로 HTML을 만드는 것 보다 빌드 타임에 한 번만 생성하게 비용이 더 싸다.
- CDN으로 제공 (Cache 가능)

### Static Generation을 사용할 수 없는 경우

    - 페이지의 일부분을 Client-side Rendering을 사용하라
    - Server-side Rendering을 사용하라

### Server-side Rendering(SSR / Dynamic Rendering)

- User request마다 HTML 생성

```typescript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
```
