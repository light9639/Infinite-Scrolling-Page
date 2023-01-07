import React, { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

interface Post {
  index: number;
  src: {
    first: string;
  },
  Review: number;
  name: string;
  info: string;
  price: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);
  const [ref, inView] = useInView();

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get<Post[]>(
        `http://localhost:5000/Every?_limit=10&_page=${page.current}`
      );
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasNextPage(data.length === 10);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '32px' }}>
          Infinite Scrolling Example
        </h1>
        <div style={{ position: 'relative' }}>
          {posts?.map((post: Post, idx: number) => (
            <div
              key={idx}
              style={{
                marginBottom: '1rem',
                borderRadius: '25px',
                padding: '8px',
                background: post.index % 10 === 0 ? 'aliceblue' : '',
              }}
            >
              <p>userId: {post.index}</p>
              <img src={post.src.first} alt={post.name} style={{width: "25%", borderRadius: '25px'}} />
              <p>Review: {post.Review}</p>
              <p>name: {post.name}</p>
              <p>info: {post.info}</p>
              <p>price: {post.price}</p>
            </div>
          ))}
          <div ref={ref} style={{ position: 'absolute', bottom: '100px' }} />
        </div>
      </div>
    </div>
  )
}

export default App
