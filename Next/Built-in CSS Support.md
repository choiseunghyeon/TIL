https://nextjs.org/docs/basic-features/built-in-css-support

Next.js는 JS에서 CSS를 가져올 수 있습니다.

# Adding a Global StyleSheet

`pages/_app.js`에 CSS file을 import 하라.

```typescript
// `pages/_app.js`
import "../styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

style.css는 모든 page, component에 적용됩니다.  
stylesheet의 글로벌 특성으로 인한 충돌을 피하기 위해 `pages/_app.js`에서만 css를 가져올 수 있습니다.

## TIP

- 개발 모드에서 css 변경은 hot reload됩니다.
- 제품 모드에서 모든 CSS file은 병합되어 하나의 .css file로 minified됩니다.

## Import styles from `node_modules`

application 어디서든 node_moudels의 CSS file을 import 할 수 있습니다.  
global stylesheets를 위해서는 `pages/app.js`안에서 import 해야 합니다.

```typescript
// pages/_app.js
import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

third party component에서 필요한 CSS를 사용하기 위해서는 다음과 같이 사용할 수 있습니다.

```typescript
// components/ExampleDialog.js
import { useState } from "react";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";

function ExampleDialog(props) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <button onClick={open}>Open Dialog</button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <p>Hello there. I am a dialog</p>
      </Dialog>
    </div>
  );
}
```

## Adding Component-Level CSS

`[name].module.css` file naming으로 CSS Module을 사용할 수 있다.

고유 class name을 자동으로 생성하여 지역 범위에만 CSS를 적용할 수 있다. (서로 다른 file에서 같은 class name을 사용 해도 된다. 실제로는 고유 class name으로 생성되므로 겹치지 않는다.)

```typescript
// components/Button.js
import styles from "./Button.module.css";

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}>
      Destroy
    </button>
  );
}
```

## CSS-in-JS

https://github.com/vercel/next.js/tree/canary/examples/with-styled-components
