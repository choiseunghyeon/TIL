# Big Countries

**Description**

A country is big if it has an area of bigger than 3 million square km or a population of more than 25 million.

Write a SQL solution to output big countries' name, population and area.

- 국가 면적이 3 million square km 이상 또는 인구가 25million이상의 큰 국가들을 출력하라.

**MySQL**

    select name, population, area
    from World
    where area > 3000000 or population > 25000000

select에는 테이블이 가지고 있는 컬럼을 넣어준다.

from은 테이블 이름

where은 조건이 들어간다. 
