import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const md2Html = async (md: string) => {
  const res = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeCodeTitles)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md)
  return res.toString()
}
