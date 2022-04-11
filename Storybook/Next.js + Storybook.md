npx sb init --builder webpack5

## 폴더 구조

- .storybook
- components
- container
- pages
- store
  ...

## 절대경로 지원

```typescript
// .storybook/main.js
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async config => {
    config.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );
    return config;
  },
};
```

```typescript
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "pages/*": ["pages/*"],
      "components/*": ["components/*"],
      "container/*": ["container/*"],
      "store/*": ["store/*"],
      "type/*": ["type/*"]
    }
    ...
  },
  ...
}

```
