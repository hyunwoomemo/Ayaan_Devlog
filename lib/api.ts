import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@leafac/rehype-shiki";
import rehypePrettyCode from 'rehype-pretty-code';
import * as shiki from "shiki";

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined;

export interface PostProps { 
  id: string;
  date: string;
  title: string;
  html: string;
  category: string;
  summary: string;
}


async function getParserPre() {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // theme: 'nord',
      theme: {
        light: 'rose-pine-dawn',
        dark: 'nord',
      } 
      
    })
    .use(remarkGfm)
    // .use(rehypeShiki, {
    //   highlighter: await shiki.getHighlighter({ theme: "dracula" }),
    // })
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: (arg) => ({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + arg.properties?.id,
          style: "margin-right: 10px",
        },
        children: [{ type: "text", value: "#" }],
      }),
    });
}

function getParser() {
  if (!p) {
    p = getParserPre().catch((e) => {
      p = undefined;
      throw e;
    });
  }
  return p;
}

export async function getPostById(category: string, id: string) {
  const realId = id.replace(/\.md$/, "");
  const fullPath = join("_posts", category, `${realId}.md`);
  const { data, content } = matter(await fs.promises.readFile(fullPath, "utf8"));

  const parser = await getParser();
  const html = await parser.process(content);

  return {
    ...data,
    title: data.title,
    category: data.category,
    summary: data.summary,
    id: realId,
    date: `${data.date?.toISOString().slice(0, 10)}`,
    html: html.value.toString(),
  };
}

export async function getTILById(category: string, id: string) {
  const realId = id.replace(/\.md$/, "");
  const fullPath = join("_TIL", category, `${realId}.md`);
  const { data, content } = matter(await fs.promises.readFile(fullPath, "utf8"));

  const parser = await getParser();
  const html = await parser.process(content);

  return {
    ...data,
    title: data.title,
    category: data.category,
    summary: data.summary,
    id: realId,
    date: `${data.date?.toISOString().slice(0, 10)}`,
    html: html.value.toString(),
  };
}

export async function getAllPosts() {
  const categories = fs.readdirSync("_posts");
  const posts = await Promise.all(
    categories.map(async (category) => {
      const categoryPosts = await Promise.all(
        fs.readdirSync(join("_posts", category)).map((id) => getPostById(category, id))
      )
      return categoryPosts;
    })
  );


  const allPosts = posts.flat();

  return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getAllTIL() {
  const dates = fs.readdirSync("_TIL");
  const posts = await Promise.all(
    dates.map(async (category) => {
      const categoryPosts = await Promise.all(
        fs.readdirSync(join("_TIL", category)).map((id) => getTILById(category, id))
      )
      return categoryPosts;
    })
  );


  const allPosts = posts.flat();

  return {postDate: dates, post: allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))};
}

interface objectProps {
  category: string;
  length: number;
}

export async function getCategories() {
  const ctgList = fs.readdirSync("_posts");
  const categories:objectProps[] = [];
  ctgList.forEach(async (category) => { 
    categories.push({ category: category, length: fs.readdirSync(join("_posts", category)).length })
  })

  return categories
}