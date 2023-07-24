import { getAllTIL } from "@/lib/api";
import TILPage from '../components/TIL/TILPage';
import TILItem from '../components/TIL/TILItem';
import TILWrapper from '../components/TIL/TILWrapper';

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post() {
  const {category, post} = await getAllTIL();
  console.log(post)

  // const filterPost = category.map((v) => post.filter((p) => p.date === v));

  return (
    <TILPage>
      <ul>
        {category.reverse().map((v) => {
          const filterPost = post.filter((p) => p.date === v);
          const postData = filterPost.map((p) => {
            console.log(p)
            const { id, html } = p;
            return (
              <TILWrapper key={id}>
                <TILItem html={html}></TILItem>
              </TILWrapper>
            )
          })
          return (
            <div key={v}>
              <li>{v}</li>
              <div>
              {postData}
              </div>
            </div>
          )
        })}
      </ul>
    </TILPage>
  );
}
