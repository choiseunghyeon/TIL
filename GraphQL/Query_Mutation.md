## 쿼리 & 뮤테이션

###필드  
GraphQL 쿼리는 연관된 객체와 필드를 탐색 할 수 있으므로 클라이언트는 기존 REST 구조처럼 여러번 요청을 수행하는 대신 한번의 요청으로 많은 데이터를 가져올 수 있습니다.

```
// 요청
{
  hero {
    name
    # 쿼리에 주석을 쓸 수도 있습니다!
    friends {
      name
    }
  }
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 인자

REST API의 경우  
다음 예시처럼 사용  
http://localhost:3000/users/1  
http://localhost:3000/users?user=1

GraphQL은 모든 필드와 중첩된 객체가 인자를 가질 수 있다.  
여러번의 API fetch를 대체할 수 있다.

인자는 다양한 타입일 수 있다.

```
요청
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

```
응답
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

### 별칭

다른 인자를 사용하여 같은 필드를 직접 쿼리 할 수는 없다.  
따라서 필드의 결과를 원하는 이름으로 바꿀 수 있는데 이것이 별칭이 필요한 이유

별칭이 없다면 hero 필드는 서로 충돌하게 된다.

```
// 요청
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

```
// 응답
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

### 프래그먼트

재사용 가능한 단위  
필드셋을 구성한 다음 필요한 쿼리에 포함시킬 수 있다.

프래그먼트 개념은 복잡한 응용 프로그램의 데이터 요구사항을 작은 단위로 분할하는데 사용됩니다

분할 및 조합

```
// 요청
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

```
// 응답
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 프래그먼트 안에서 변수 사용하기

쿼리나 뮤테이션에 선언된 변수는 프래그먼트에 접근할 수 있습니다.

```
// 요청
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

```
// 응답
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "friendsConnection": {
        "totalCount": 4,
        "edges": [
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          },
          {
            "node": {
              "name": "C-3PO"
            }
          }
        ]
      }
    },
    "rightComparison": {
      "name": "R2-D2",
      "friendsConnection": {
        "totalCount": 3,
        "edges": [
          {
            "node": {
              "name": "Luke Skywalker"
            }
          },
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          }
        ]
      }
    }
  }
}
```

### 작업 이름

실제 애플리케이션에서는 명시적으로 코드를 표현하는 것이 좋다.

협업 / 로깅 / 에러 찾기 등에서 효율적
ex. JS에서 익명 함수 디버깅 시 의미 파악에 대한 어려움

작업 타입

- 쿼리(query)
- 뮤테이션(mutation)
- 구독(subscription)

### 변수

변수를 사용하기 위해서는 세 가지 작업을 해야 한다.

1. 쿼리안의 정적 값을 $variableName으로 변경
2. $variableName을 쿼리에서 받는 변수로 선언
3. 별도의 전송규약(일반적으로는 JSON) 변수에 variableName: value 을 전달하세요.

```
// 요청
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

```
// variables
{
  "episode": "JEDI"
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 변수 정의

- 변수 정의는 위 쿼리에서 ($episode: Episode) 부분
- 정적타입 언어의 함수에 대한 인자 정의와 동일
- 선언된 모든 변수는 스칼라, 열거형, input object type이어야 한다.
- 변수 정의는 옵셔널이거나 필수일 수 있다.
  - !가 없으면 옵셔널
  - 변수를 전달할 필드에 null이 아닌 인자가 요구된다면 변수가 필요하다.

### 변수 기본값

```
// 타입 선언 다음에 기본값을 명시하여 변수에 기본값을 할당할 수 있다.
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

### 지시어

쿼리 구조와 형태를 동적으로 변경  
필드나 프래그먼트에 삽입될 수 있다.  
서버가 원하는 방식으로 쿼리 실행에 영향을 준다.

코어 GraphQL 사양에는 두 가지 지시어가 포함되어 있다.  
이는 GraphQL 서버에서 지원해야 한다.

- @include(if: Boolean): 인자가 true 인 경우에만 이 필드를 결과에 포함
- @skip(if: Boolean) 인자가 true 이면 이 필드를 건너뛴다.

지시어는 쿼리의 필드를 추가하고 제거하기 위해 문자열을 조작을 해야하는 상황을 피하는데 유용할 수 있다.

서버에서는 새로운 지시어를 정의하여 실험적인 기능을 추가할 수도 있다.

```
// 요청
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

```
// variables
{
  "episode": "JEDI",
  "withFriends": false
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

```
// variables
{
  "episode": "JEDI",
  "withFriends": true
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 뮤테이션

서버 측 데이터 수정

createReview 필드가 새로 생성된 리뷰의 stars 와 commentary 필드를 반환한다.

하나의 요청으로 필드의 새 값을 변경하고 쿼리할 수 ​​있기 때문에 기존 데이터를 변경하는 경우(예: 필드를 증가시킬 때) 특히 유용하다.

```
// 요청
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

```
// variables
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

```
// 응답
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

### 뮤테이션의 다중 필드

쿼리와 마찬가지로 여러 필드를 포함할 수 있다.

중요한 차이점

쿼리 필드는 병렬로 실행되지만 뮤테이션 필드는 하나씩 차례대로 실행된다.

즉, 하나의 요청에서 두 개의 incrementCredits 뮤테이션를 보내면 첫 번째는 두 번째 요청 전에 완료되는 것이 보장된다.

### 인라인 프래그먼트

GraphQL 스키마에는 인터페이스와 유니온 타입을 정의할 수 있다.  
[스키마 가이드](https://graphql-kr.github.io/learn/schema/#interfaces)

인터페이스나 유니언 타입을 반환하는 필드를 쿼리하는 경우, 인라인 프래그먼트 을 사용해야한다.

이 쿼리에서 hero 필드는 Character 를 반환하는데, episode 인자에 따라서 Human이나 Droid 중 하나일 수 있다. 필드를 직접 선택할 때에는 name 과 같이 Character 인터페이스에 존재하는 필드만 요청할 수 있다.

특정한 타입의 필드를 요청하려면 타입 조건과 함께 인라인 프래그먼트 을 사용해야한다. 첫 번째 프래그먼트는 ... on Droid 라는 레이블이 붙어있기 때문에 primaryFunction 필드는 hero 에서 반환된 Character 가 Droid 타입인 경우에만 실행된다. Human 타입의 height 필드도 마찬가지이다.

```
// 요청
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}

```

```
// variables
{
  "ep": "JEDI"
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

### 메타 필드

GraphQL 서비스에서 리턴될 타입을 모르는 상황이 발생하면 클라이언트에서 해당 데이터를 처리하는 방법을 결정할 방법이 필요하다.  
GraphQL을 사용하면 쿼리의 어느 지점에서나 메타 필드인 \_\_typename 을 요청하여 그 시점에서 객체 타입의 이름을 얻을 수 있다.

각 타입을 구분할 구분자가 필요하다.

search는 3 가지 중 하나인 유니언 타입을 반환한다.  
\_\_typename 필드가 없으면 클라이언트가 각 타입을 구별할 수 없다.

GraphQL 서비스는 몇 가지 메타 필드를 제공하며, 나머지는 Introspection 시스템을 노출하는 데 사용된다.

```
// 요청
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

```
// 응답
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```
