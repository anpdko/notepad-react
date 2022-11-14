import {useMemo} from 'react'

// sort - метод сортировки
export const useSortedPosts = (posts, sort) => {
   //Возвращает отсортированый массив
   const sortedPosts = useMemo(()=>{
      if(sort){
         return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
      }
      return posts
   },[sort, posts])

   return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
   const sortedPosts = useSortedPosts(posts, sort)

  //Возвращает массив поиска после сортировки
   const sortedAndSearchedPosts = useMemo(()=>{
      return sortedPosts.filter(post => 
         post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
   }, [query, sortedPosts])

   return sortedAndSearchedPosts;
}