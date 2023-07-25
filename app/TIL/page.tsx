import { getAllTIL } from "@/lib/api";
import TILPage from '../components/TIL/TILPage';
import TILItem from '../components/TIL/TILItem';
import TILWrapper from '../components/TIL/TILWrapper';
import TILHeader from '../components/TIL/TILHeader';
import { useRouter } from 'next/router';
import TILList from '../components/TIL/TILList';

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post() {
  const {postDate, post} = await getAllTIL();
  console.log(post)
  const categories = post.map((item) => item.category);
  // const filterPost = postDate.map((v) => post.filter((p) => p.date === v));

  return (
    <TILPage>
      <TILHeader category={categories} />
      <TILList postDate={postDate} post={post}>
      </TILList>
    </TILPage>
  );
}
