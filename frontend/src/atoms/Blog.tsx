import {  useRecoilValue, useSetRecoilState,useRecoilCallback } from "recoil";
import { BlogData } from "../components/Blogtemplate";
import { blogPostFamily, blogPostIdsState } from "./creat";
import { useEffect, useState } from "react";

interface BlogProps {
    arrayToStore: BlogData[];
}

export default function Blog({ arrayToStore }: BlogProps) {
  return (
    <div>
        <CreateAtoms arrayToStore={arrayToStore} />
    </div>
  )
}

function CreateAtoms({ arrayToStore }: BlogProps) {
    const setBlogPostIds = useSetRecoilState(blogPostIdsState);
    const [check,setc] = useState(false)
    const initializeAtoms = useRecoilCallback(({ set }) => () => {
      const ids:any = arrayToStore.map((blogPost) => blogPost.id);
      setBlogPostIds(ids);
      // console.log(ids)
      arrayToStore.forEach((blogPost) => {
        const { id, title, content, published, authorId } = blogPost;
        set(blogPostFamily(id), {
          id,
          title,
          content,
          published,
          authorId,
        });
      });
      setc(true)
    }, [arrayToStore, setBlogPostIds]);
  
    useEffect(() => {
      initializeAtoms();
    }, [initializeAtoms]);
  
    return <div>
        {check?<Showrecoilval /> : <h1>hello loading</h1>}
    </div>
  }

function Showrecoilval () {
    const ids = useRecoilValue(blogPostIdsState);
    
    return <div></div>
}


