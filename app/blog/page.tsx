// app/page.tsx
import { getAllPosts, getCategories } from '@/lib/api';
import Link from 'next/link';
import PostPage from '../components/PostPage';
import Image from 'next/image';
import PostItem from '../components/PostItem';
import Category from '../components/Category';

interface Post { 
  id: string;
  date: string;
  title: string;
  html: string;
  category: string;
}


export default async function Page() {
  const posts = await getAllPosts();
  const categories = await getCategories();
  return (
    <PostPage>
      {/* <Category categories={categories} /> */}
      <ul>
      {posts?.map((post) => {
          const { id, date, title, category, summary } = post;
        return (
            <PostItem key={id} hide={false}>
              <Link href={`/blog/${category}/${id}`} key={id}>
              <li>{category}</li>
              <li>{title}</li>
              <li>{summary}</li>
                <div>
                  <li>{date}</li>
                </div>
              </Link>
            </PostItem>
          );
        })}
      </ul>
      </PostPage>
  );
}


