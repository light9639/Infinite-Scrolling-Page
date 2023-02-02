# 📜 React, Infinite-Scrolling-Api를 이용하여 만든 예제입니다.
![127 0 0 1_5173_](https://user-images.githubusercontent.com/95972251/212913858-9c754814-7a53-4238-9750-77866965b5fd.png)

:sparkles: React, Infinite-Scrolling-Api를 이용하여 만든 예제입니다. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🛩️ react-intersection-observer, json-server, Axios 설치
- react-intersection-observer, json-server 설치 명령어
```bash
npm install react-intersection-observer, json-server
# or
yarn add react-intersection-observer, json-server
```

- axios 설치 명령어
```bash
npm install axios
# or
yarn add axios
```

## ✒️ package.json, App.tsx, db.json 수정 및 작성
### :zap: package.json
- package.json `script` 부분에 밑의 명령어를 추가한다.
```js
"scripts": {
  "server": "json-server --watch db.json --port 5000",
  ...
}
```
### :zap: App.tsx
- json-server는 백엔드 서버가 없을 때 데이터를 가져와 프론트 단에서 사용할 수 있도록 하는 라이브러리다.
- 따라서 package.json에 적힌 `yarn server`와 `yarn dev`를 터미널에서 동시에 사용하면 작동한다.
- `http://localhost:5000/Every?_limit=10&_page=${page.current}`을 작성하여 10개 씩만 로드되도록 작성한다.
- `intersection-observer`를 활용하기 위해 usEffect 안에 `if (inView && hasNextPage) {fetch();}`라 작성하여 실행시킨다.
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
### :zap: db.json 작성.
- db.json에 자신이 원하는 데이터를 작성하고 App.tsx에 type을 작성하면 된다. 필자는 밑의 방식의 json 파일을 만들었다.
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
    "alt": "나이키 에어맥스 AP",
    "name": "나이키 에어맥스 AP",
    "info": "남성 신발",
    "price": "119,000원",
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
## ⚗️ 완성 후 테스트
- 테스트 해보면 첫 로드시에 10개의 자료가 생성된 후 맨 밑에 도달하면 다시 10개의 자료가 생성된 것을 확인할 수 있다.
