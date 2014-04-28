/*
★날짜(시작일,종료일)를 바꿔서 사용★
---칼럽내용---
1.참여개발자수(전체)
*/
set @start = '13-01-13'; /*시작일*/
set @end = '13-01-20'; /*종료일 +1*/
select count(distinct(c.owner_account_id)) "참여개발자(전체)"
from changes c
where c.created_on  < @end 
and   c.created_on >= @start 
;