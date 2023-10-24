## 스키마 & 타입

### 타입 시스템

GraphQL 쿼리 언어는 기본적으로 객체의 필드를 선택한다.

1. root 객체로 시작
2. hero 필드 선택
3. hero 객체에 대해 name과 appearIn 필드 선택

쿼리와 결과의 형태가 거의 일치하므로 서버에 대해 모르더라도 결과를 예측할 수 있다.

하지만, 스키마를 통해 서버에 요청할 수 있는 데이터에 대한 정확한 표현을 갖는것이 좋다.

따라서, 쿼리 가능한 데이터들에 대한 타입을 정의하고 쿼리가 들어오면 해당 스키마에 대해 유효성 검사 후 실행된다.

-   선택 가능한 필드
-   반환하는 객체의 종류
-   하위 객체에서 사용할 수 있는 필드

```
// 요청
{
  hero {
    name
    appearsIn
  }
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```

### 타입 언어

GraphQl 서비스는 어떤 언어로든 작성할 수 이싸. 따라서 특정 언어에 의존할 수 없으므로 독립적인 언어를 정의한다.  
GraphQL schema language를 사용한다.

### 객체 타입과 필드

객체 타입

-   객체의 종류와 그 객체의 필드를 나타낸다.

Character는 객체 타입

-   필드가 있음

name과 appearIn은 Character 타입의 필드

String은 내장된 스칼라 타입 중 하나

String!은 non-nullable을 의미

-   필드를 쿼리할 때 항상 값을 반환한다.

[Episode]!는 Episod 객체의 배열.

-   non-nullable이므로 0개 이상의 아이템을 가진 배열을 기대할 수 있다.

```GraphQL
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

### 인자

객체 타입의 모든 필드는 0개 이상의 인수를 가질 수 있다.

모든 인수에는 이름이 있다.  
함수가 순서 있는 인자를 가져오는 JS, Python과 달리 특별한 이름으로 전달된다.  
이 경우, length 필드는 하나의 인자 unit을 가진다.  
인자는 필수거나 옵셔널이다.  
옵셔널인 경우 기본값을 정의할 수 있다.

```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

### 쿼리 타입 & 뮤테이션 타입

GraphQL 서비스는 query 타입을 가지며 mutation 타입은 있을수도 없을수도 있습니다.  
query, mutation 타입은 모든 쿼리의 진입점(entry point)을 정의한다.

```
schema {
  query: Query
  mutation: Mutation
}
```

```
// 요청
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
```

```
// 응답
{
  "data": {
    "hero": {
      "name": "R2-D2"
    },
    "droid": {
      "name": "C-3PO"
    }
  }
}
```

hero 및 droid 필드가 있는 Query 타입이 있어야 합니다.

```
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

### 스칼라 타입

-   Int: 부호가 있는 32비트 정수
-   Float: 부호가 있는 부동소수점 값.
-   String: UTF-8 문자열
-   Boolean: true 또는 false
-   ID: 객체를 다시 요청하거나 캐시의 키로써 자주 사용되는 고유 식별자를 나타낸다. ID 타입은 String 과 같은 방법으로 직렬화되지만, ID 로 정의하는 것은 사람이 읽을 수 있도록 하는 의도가 아니라는 것을 의미합니다.

### 커스텀 스칼라 타입 지정

해당 타입을 직렬화, 역 직렬화, 유효성 검사하는 방법을 구현할 수 있다.

```
scalar Date
```

### 열거형 타입

특정 값들로 제한되는 스칼라로 다음과 같은 작업을 할 수 있다.

1. 타입의 인자가 허용된 값 중 하나임을 검증
2. 필드가 항상 값의 열거형 집합 중 하나가 될 것임을 타입 시스템을 통해 의사소통

```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

### 리스트와 Non-Null

스키마의 다른 부분이나 쿼리 변수 선언에서 타입을 사용하면 해당 값의 유효성 검사를 할 수 있는 타입 수정자(type modifiers)를 적용할 수 있다.

!는 Non-Null 표시로 필드, 필드에 대한 인자를 정의할 때도 사용할 수 있다.

null 값이 들어오는 경우 유효성 검사 오류를 반환한다.

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

```
// 요청
query DroidById($id: ID!) {
  droid(id: $id) {
    name
  }
}
```

```
// variables
{
  "id": null
}
```

```
// 응답
{
  "errors": [
    {
      "message": "Variable \"$id\" of required type \"ID!\" was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 17
        }
      ]
    }
  ]
}
```

[]는 해당 타입의 배열을 반환합니다.

Non-Null 및 List 수정자를 결합할 수도 있다.

list 자체는 null일 수 있지만 아이템으로 null을 가질 수 없다.

```
myField: [String!]
```

```
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```

list 자체는 null일 수 없지만 null 값을 포함할 수 있다.

```
myField: [String]!
```

```
myField: null // error
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```

### 인터페이스

```
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

두 타입 모두 Character 인터페이스의 모든 필드를 가진다.  
또한, 특정 필드를 추가할 수 있다.

```
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

인터페이스는 객체나 객체리스트를 반환하려는 경우에 유용하지만, 다양한 다른 타입이 있을 수도 있다.

예를 들면, 다음 쿼리는 오류를 반환한다.

hero 필드는 Character 타입을 반환하는데, episode 인자에 따라 Human, Droid 중 하나일 수 있다.  
위 쿼리는 primaryFunction 을 포함하지 않는 Character 인터페이스에 존재하는 필드만 요청할 수 있다.

```
// 요청
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    primaryFunction
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
  "errors": [
    {
      "message": "Cannot query field \"primaryFunction\" on type \"Character\". Did you mean to use an inline fragment on \"Droid\"?",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ]
    }
  ]
}
```

특정 객체 타입의 필드를 요청하려면 인라인 프래그먼트을 사용해야한다.

```
// 요청
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
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

### 유니온 타입

인터페이스와 유사하지만, 타입 간에 공통 필드를 특정하지 않는다.

-   유니온 타입의 멤버는 구체적인 객체 타입이어야 한다.
-   인터페이스나 유니온 타입에서 다른 유니온 타입을 사용할 수 없다.

스키마에서 SearchResult 타입을 반환 할 때마다, Human, Droid, Starship 을 얻을 수 있다.

```
union SearchResult = Human | Droid | Starship
```

이 경우, SearchResult 유니언 타입을 반환하는 필드를 쿼리하면, 어떤 필드라도 쿼리할 수 있는 조건부 프래그먼트를 사용해야합니다.

```
// 요청
{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
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
        "name": "Han Solo",
        "height": 1.8
      },
      {
        "name": "Leia Organa",
        "height": 1.5
      },
      {
        "name": "TIE Advanced x1",
        "length": 9.2
      }
    ]
  }
}
```

### 입력 타입

입력 타입은 객체 타입과 정확히 같지만, type 대신 input을 사용한다.

뮤테이션에서 유용하다.  
뮤테이션은 생성될 전체 객체를 전달하고자 할 수 있다.

입력 객체 타입의 입력란은 입력 객체 타입을 참조할 수 있지만, 입력 및 출력 타입을 스키마에 혼합할 수는 없습니다. 또한 필드에 인자를 가질 수 없습니다.

```
input ReviewInput {
  stars: Int!
  commentary: String
}
```

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
