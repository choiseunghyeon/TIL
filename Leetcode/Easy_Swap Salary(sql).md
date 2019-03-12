# Swap Salary

**Description**

Given a table salary, such as the one below, that has m=male and f=female values. Swap all f and m values (i.e., change all f values to m and vice versa) with a single update query and no intermediate temp table.

- 성별을 m->f, f->m으로 바꾸어라
- 쿼리는 update문 하나여야 하며 임시 테이블은 필요 없음

**MySQL**

    update salary
    set sex=IF(sex='f','m','f')
update에는 테이블 이름이 들어가며

set에는 설정되는 컬럼의 이름과 그 이름의 값이 들어간다.

추가적으로 where절을 쓸 수 있다.
