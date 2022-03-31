https://nextjs.org/docs/basic-features/image-optimization

## Image Component 이점
- 향상된 성능: device에 맞는 사이즈의 이미지를 제공한다.
- Visual Stability: Prevent Cumulative Layout Shift automatically
- 빠른 페이지 로드: 뷰포트에 들어갈 때만 이미지 로드
- Asset Flexibility: On-demand image resizing, even for images stored on remote servers

## Local Images
- Build Time에 사용되어야 하므로 `await import() or require()`는 지원되지 않는다. 
- image file 기반으로 width, height는 자동으로 정해진다.
```typescript
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}
```

## Remote Images
- Build Time에 remote image에 접근할 수 없으므로 width, height가 제공되어야 한다.  
```typescript
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}
```

## Domains
- Next.js Image Optimization API를 사용하면서 remote image에 접근하고 싶으면 loader를 기본 설정으로 하고 absoule URL을 입력하라
- 악용을 막기 위해 접근 가능한 URL을 작성해야 한다. (`next.config.js`)

```typescript
module.exports = {
  images: {
    domains: ['example.com', 'example2.com'],
  },
}
```