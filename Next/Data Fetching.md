https://nextjs.org/docs/basic-features/data-fetching/overview

**모든 API는 Page file에서 export 되어야 한다.**  
**각 개념의 API(ex. getStaticProps)는 CMS, DB, API를 API 안에서 처리할 수 있다. - Server에서만 실행되고 Client Bundle File에서는 존재하지 않는다.**  
**fetching logic은 `lib/` 에서 공유할 수 있다.**

---

## SSG - Static Site Generation

### 언제

- SEO가 중요
- User Request 전 Build Time에 생성할 수 있는 Page인 경우
- The data comes from a headless CMS
- The data can be publicly cached (not user-specific)

### getStaticProps 실행 시점

- next build
- revalidate (Background에서 실행)
- getStaticProps runs on-demand in the background when using unstable_revalidate
- Incremental Static Regeneration과 함께 사용 시 stale page가 재검증 되었을 때

### 기타

- getStaticProps는 들어오는 request에 접근할 수 없다. 만약 접근해야 한다면 Middleware를 사용하자
- In development (next dev), getStaticProps will be called on every request.

## Statically generates both HTML and JSON

1. Build Time에 실행되는 getStaticProps의 결과로 JSON file을 만든다.
2. Client에서 Page 이동 시 Next.js에서는 미리 만든 JSON file을 Page Component의 props로 전달한다. (getStaticProps를 다시 호출하지 않는다.)

- Incremental Static Generation 사용 시 getStaticProps는 Background로 실행된다.

### API

- getStaticProps

---

## Dynamic Routes

Page가 Dynamic Routes가 있고 getStaticProps를 사용한다면 path list가 필요하다.

### 특징

- getStaticPaths는 getStaticProps와 함께 사용되어야 한다.

### 언제

- SEO가 중요
- The data comes from a headless CMS / DB / File System
- The data can be publicly cached (not user-specific)

### getStaticPaths 실행 시점

- next build
- fallback: true 일 때 Background에서 실행
- fallback: blocking 일 때 Initial Render 전에 실행

### API

- getStaticPaths

---

## SSR - Server Side Rendering

### 특징

- request time에 실행 - User Request 마다 SSR 실행
- Error 발생 시 pages/500.js page 표시

### 언제

- SEO가 중요
- 지속적으로 data가 update 되어야 한다.

### API

- getServerSideProps

---

## CSR - Client Side Rendering

### 언제

- SEO가 상관없다.
- 지속적으로 data가 update 되어야 한다.

---

## ISR - Incremental Static Regeneration

### 특징

- Site Build 이후 static pages를 생성하거나 업데이트 할 수 있다.
- ISR은 Site rebuild 없이 페이지당 static-generation을 할 수 있다.

### 사용 방법

getStaticProps에 revalidate prop 추가

```typescript
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
```

When a request is made to a page that was pre-rendered at build time, it will initially show the cached page.

Any requests to the page after the initial request and before 10 seconds are also cached and instantaneous.
After the 10-second window, the next request will still show the cached (stale) page
Next.js triggers a regeneration of the page in the background.
Once the page generates successfully, Next.js will invalidate the cache and show the updated page. If the background regeneration fails, the old page would still be unaltered.
When a request is made to a path that hasn’t been generated, Next.js will server-render the page on the first request. Future requests will serve the static file from the cache. ISR on Vercel persists the cache globally and handles rollbacks.
