import { useState, useEffect } from "react";

const InfiniteScrollPosts = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(null);

  const getCardData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
      );
      const data = await res.json();
      setCard((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handleInfiniteScroll = () => {
    try {
      if (
        !loading &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setPage( page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [loading,]);

  return (
    <>
      {card.map((post, idx) => (
        <div style={{ backgroundColor: "red" }} key={idx}>
          <h3>
            {post.id}&nbsp;{post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <h1>Loading.....</h1>}
    </>
  );
};

export default InfiniteScrollPosts;
