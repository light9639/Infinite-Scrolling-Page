# π React, Infinite-Scrolling-Apiλ₯Ό μ΄μ©νμ¬ λ§λ  μμ μλλ€.
![127 0 0 1_5173_](https://user-images.githubusercontent.com/95972251/212913858-9c754814-7a53-4238-9750-77866965b5fd.png)

:sparkles: React, Infinite-Scrolling-Apiλ₯Ό μ΄μ©νμ¬ λ§λ  μμ μλλ€. :sparkles:
## :tada: React μμ±
- React μμ±
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- viteλ₯Ό μ΄μ©νμ¬ νλ‘μ νΈλ₯Ό μμ±νλ €λ©΄
```bash
npm create vite@latest
# or
yarn create vite
```
- ν°λ―Έλμμ μ€ν ν νλ‘μ νΈ μ΄λ¦ λ§λ  ν React μ ν, Typescirpt μ ννλ©΄ μμ± μλ£.
## π©οΈ react-intersection-observer, json-server, Axios μ€μΉ
- react-intersection-observer, json-server μ€μΉ λͺλ Ήμ΄
```bash
npm install react-intersection-observer, json-server
# or
yarn add react-intersection-observer, json-server
```

- axios μ€μΉ λͺλ Ήμ΄
```bash
npm install axios
# or
yarn add axios
```

## βοΈ package.json, App.tsx, db.json μμ  λ° μμ±
### :zap: package.json
- `package.json` `script` λΆλΆμ λ°μ λͺλ Ήμ΄λ₯Ό μΆκ°νλ€.
```js
"scripts": {
  "server": "json-server --watch db.json --port 5000",
  ...
}
```
### :zap: App.tsx
- `json-server`λ λ°±μλ μλ²κ° μμ λ λ°μ΄ν°λ₯Ό κ°μ Έμ νλ‘ νΈ λ¨μμ μ¬μ©ν  μ μλλ‘ νλ λΌμ΄λΈλ¬λ¦¬λ€.
- λ°λΌμ `package.json`μ μ ν `yarn server`μ `yarn dev`λ₯Ό ν°λ―Έλμμ λμμ μ¬μ©νλ©΄ μλνλ€.
- `http://localhost:5000/Every?_limit=10&_page=${page.current}`μ μμ±νμ¬ 10κ° μ©λ§ λ‘λλλλ‘ μμ±νλ€.
- `intersection-observer`λ₯Ό νμ©νκΈ° μν΄ usEffect μμ `if (inView && hasNextPage) {fetch();}`λΌ μμ±νμ¬ μ€νμν¨λ€.
```js
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
```
### :zap: db.json μμ±.
- `db.json`μ μμ μ΄ μνλ λ°μ΄ν°λ₯Ό μμ±νκ³  `App.tsx`μ `type`μ μμ±νλ©΄ λλ€. νμλ λ°μ λ°©μμ `json` νμΌμ λ§λ€μλ€.
```js
{
    "index": 0,
    "src": {
        "first": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/1.jpg",
        "second": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/2.jpg",
        "third": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/3.jpg",
        "four": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/4.jpg",
        "five": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/5.jpg",
        "six": "https://raw.githubusercontent.com/light9639/ImgStorage/main/shoestore/Shoes/Men/Men_000/6.jpg"
    },
    "alt": "λμ΄ν€ μμ΄λ§₯μ€ AP",
    "name": "λμ΄ν€ μμ΄λ§₯μ€ AP",
    "info": "λ¨μ± μ λ°",
    "price": "119,000μ",
    "Gender": "Men",
    "href": "/Men",
    "star": {
        "first": "currentColor",
        "second": "currentColor",
        "third": "none",
        "four": "none",
        "five": "none"
    },
    "Review": 2
},
```
## βοΈ μμ± ν νμ€νΈ
- νμ€νΈ ν΄λ³΄λ©΄ μ²« λ‘λμμ 10κ°μ μλ£κ° μμ±λ ν λ§¨ λ°μ λλ¬νλ©΄ λ€μ 10κ°μ μλ£κ° μμ±λ κ²μ νμΈν  μ μλ€.
