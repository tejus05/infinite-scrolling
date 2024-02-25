"use client";

import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react';


const posts = [
  {
    title: "post 1",
    id: 1
  },
  {
    title: "post 2",
    id: 2
  },
  {
    title: "post 3",
    id: 3
  },
  {
    title: "post 4",
    id: 4
  },
  {
    title: "post 5",
    id: 5
  },
  {
    title: "post 6",
    id: 6
  },
]

// console.log(posts)

const fetchposts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const slicedPosts = posts.slice((pageParam - 1) * 2, pageParam * 2);
  // console.log(slicedPosts)
  return slicedPosts
};

export default function Home() {

  const lastPageRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPageRef.current,
    threshold: 1
  });

  
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],
    queryFn: fetchposts, 
    getNextPageParam: (lastPage, pages) => {
      // console.log("pages: ",pages)
      return pages.length + 1;
    },
    initialData: {
      pages: [posts.slice(0, 2)],
      pageParams: [1],
    },
    initialPageParam: undefined,
  });
  
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry]);

  const _posts = data?.pages.flatMap(page=>page)

  return (
    <div>
      posts : 
      {
        _posts.map((post, i) => {
          if (i === _posts.length-1) {
            return <div className='h-80 bg-purple-500 m-5' key={i} ref={ref}>
              {post.title}
            </div>
          }
          return (
            <div className='h-80 bg-purple-500 m-5' key={i}>
              {post.title}
            </div>
          )
        })
      }
      {/* {
        data?.pages.map((page, i) => (
          <div key={i}>
            {
              page.map((post, index) => (
                <div key={index}>
                  {
                    post.title
                  }
                </div>
              ))
            }
          </div>
        ))
      } */}
      {/* <button onClick={()=>fetchNextPage()} disabled={isFetchingNextPage}>
        {
          isFetchingNextPage ? "Loading more..." : "Load more"
        }
      </button> */}
    </div>
  );
}
