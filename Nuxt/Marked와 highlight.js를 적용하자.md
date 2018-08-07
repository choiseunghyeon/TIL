# Nuxt에 Marked와 highlight.js 적용

**Package install**

    npm install --save marked

    npm install --save highlight.js

**In Vue**

      <template lang="html">
        <div>
          <textarea v-model="input"></textarea>
        </div>
        <div>
          <div v-html="compiledMarkdown"></div>
        </div>
      </template>

      <script>
      import Marked, { Renderer } from 'marked'
      import highlightjs from 'highlight.js'
      export default {
        created: function () {
          const renderer = new Renderer()
          renderer.code = (code, language) => {
            // Check whether the given language is valid for highlight.js.
            const validLang = !!(language && highlightjs.getLanguage(language))
            // Highlight only if the language is valid.
            const highlighted = validLang ? highlightjs.highlight(language, code).value : code
            // Render the highlighted code with `hljs` class
            return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
          }
          // Set the renderer to marked.
          Marked.setOptions({ renderer })
        },
        data: function () {
          return {input: '# hello'}
        },
        computed: {
          compiledMarkdown: function () {
            return Marked(this.input, { sanitize: true })
          }
        },
      }
      </script>



**In nuxt.config.js**

      // styles 아래에 많은 style이 있으니 다른걸로 변경 가능
      css: [
      { src: '~/node_modules/highlight.js/styles/atom-one-dark.css', lang: 'css' }
      ],


**In Web Page**

      //사용자 입력을 받는 front-end단 에서는 ~~~ 안에 코드를 입력해야 적용된다.
      ~~~ javascript
      function $initHighlight(block, cls) {
        try {
          if (cls.search(/\bno\-highlight\b/) != -1)
            return process(block, true, 0x0F) +
                   ` class="${cls}"`;
        } catch (e) {
          /* handle exception */
        }
      }
      export  $initHighlight;
      ~~~

![Alt text](./img/markdownresult.png)
