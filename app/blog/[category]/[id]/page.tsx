import PostDetail from '@/app/components/blog/PostDetail';
import PostPage from '@/app/components/blog/PostPage';
import { getPostById, getAllPosts } from "@/lib/api";

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({ params: { id, category } }: { params: { id: string, category:string } }) {
  const { html, title, date, summary, image } = await getPostById(category,id);

  return (
    <PostPage>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <img src={image} alt="" />
      <PostDetail html={html} /> 
    </PostPage>
  );
}

// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
  const posts = await getAllPosts();
  console.log(posts);

  return posts.map((post) => ({
    id: post.id,
    category: post.category
  }));
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({ params: { id,category } }: { params: { id: string,category:string } }) {
  const { title } = await getPostById(category,id);
  return {
    title,
  };
}
