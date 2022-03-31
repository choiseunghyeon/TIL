https://nextjs.org/docs/routing/introduction

File-System 기반 Routing을 제공한다.

## Index Routes

`index` file을 소유한 folder로 자동 route 된다.

- `pages/index.js` -> `/`
- `pages/blog/index.js` -> `/blog`

## Nested routes

중첩 구조에 있는 file도 중첩 구조 그대로 route 된다.

- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

## Dynamic route segments

To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.

- `pages/blog/[slug].js` → `/blog/:slug (/blog/hello-world)`
- `pages/[username]/settings.js` → `/:username/settings (/foo/settings)`
- `pages/post/[...all].js` → `/post/* (/post/2020/id/title)`

# Linking between pages

react-router랑 비슷

```typescript
import Link from "next/link";

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

## Linking to dynamic paths

URL경로를 만들 수 있다.

```typescript
import Link from "next/link";

function Posts({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```

```typescript
import Link from "next/link";

function Posts({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link
            href={{
              // pages directory 경로 이름
              pathname: "/blog/[slug]",
              query: { slug: post.slug },
            }}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```
