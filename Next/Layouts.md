https://nextjs.org/docs/basic-features/layouts

# Layouts

React는 Page를 재사용 가능한 컴포넌트들을 조합해서 완성한다.

## Single Shared Layout with Custom App

전체 application에서 layout이 하나인 경우, Custom App을 생성하고 application을 layout으로 감싸면 된다.  
component state는 보존된다. (ex. input values, scroll)

```typescript
// pages/_app.js

import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## Per-Page Layouts

여러 layout이 필요한 경우 getLayout Property를 추가한다.  
페이지 별로 layout을 정의할 수 있다.

```typescript
// pages/index.js

import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";

export default function Page() {
  return {
    /** Your content */
  };
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
```

```typescript
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || (page => page);

  return getLayout(<Component {...pageProps} />);
}
```

이러한 layout pattern은 component state를 보존한다.

## Data Fetching

layout은 페이지가 아니므로 getStaticProps, getServerSideProps를 사용할 수 없습니다.  
그래서 useEffect, SWR 등으로 클라이언트 측에서 데이터를 가져올 수 있습니다.

```typescript
// components/layout.js

import useSWR from "swr";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  const { data, error } = useSWR("/api/navigation", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```
