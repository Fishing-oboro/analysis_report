import { useEffect, useState } from "react";

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