import { defineNuxtPlugin } from '#app';

// https://github.com/nuxt-community/markdownit-module/issues/47
// https://highlightjs.org/usage/

import hljs  from 'highlight.js';
//@ts-ignore
import mdit from 'markdown-it';

const markdownit = new mdit({
  html:         true,
  xhtmlOut:     false,
  breaks:       false,
  langPrefix:   'language-',
  linkify:      true,
  typographer:  true,
  quotes: '“”‘’',
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (error) {console.log(error)}
    }

    return '<pre class="hljs"><code>' + hljs.highlightAuto(str).value + '</code></pre>';
  }
})

markdownit.linkify.set({ fuzzyEmail: false });

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('mdit',markdownit);
});
