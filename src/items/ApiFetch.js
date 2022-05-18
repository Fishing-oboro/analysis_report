import { useCallback, useEffect, useState } from "react";


// export const ApiFetch = () => {
//   // const uri = props.uri;
//   const baseuri = 'http://localhost:4000/';
//   const [posts, setPosts] = useState([]);

//   fetch(`${baseuri}`, {method: 'GET'})
//        .then(response => response.json())
//        .then(data => setPosts(data));

//   return posts;
// }

export const ApiFetch = (url) => {
  const uri = url;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${uri}`, {method: 'GET'})
      .then((res) => res.json())
      .then((data) => {
          setPosts(data);
      });
  }, [uri])
  console.log(posts);

  return posts
}