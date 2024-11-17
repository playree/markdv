import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const md2Html = async (md: string) => {
  const res = await unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).process(md)
  return res.toString()
}
