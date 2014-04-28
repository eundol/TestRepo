/*
일별 push건수 조회
1.첫번째 칼럼은 의미 없는 데이터입니다
2.월-일 기준으로 날짜표시
3.push건수
*/
set @start = '13-02-16'; /*시작일*/
set @end = '13-03-16'; /*종료일 +1*/
select 
DATE_FORMAT(c.created_on, '%m-%d') "월-일", 
count(c.created_on) "Push건수", 
concat(concat(min(c.created_on),'~'),max(c.created_on)) "시간"
from changes c where c.created_on >= @start and c.created_on < @end
group by DATE_FORMAT(c.created_on, '%m-%d')
order by 3;