/*
★날짜(시작일,종료일)를 바꿔서 사용★
---칼럽내용---
1.   커밋수(push된 시점기준)
2.   M된 갯수
2-1. M비율
3.   A된 갯수
3-1. A비율
3-2. 미처리건(Push되었지만 Review가 되지않음)
4.   기간동안 open한 개발자수
5.   Review소요일(1일이내)
6.   Review소요일(2일이내)
7.   Review소요일(2일이상)
8,9. 최초, 최근 create일(push된 시간)
*/
set @start = '13-01-07'; /*시작일*/
set @end = '13-01-14'; /*종료일 +1*/
select 
	c.dest_project_name, 
	count(c.change_id) "Commited", 
	coalesce(c1.Merged,0) "Merged",
	concat(round((coalesce(c1.Merged,0) / count(c.change_id)) * 100),'%') "Merged 비율", 
	coalesce(c2.Abandoned,0) "Abandoned",
	concat(round((coalesce(c2.Abandoned,0) / count(c.change_id)) * 100),'%') "Abandoned 비율",
	count(c.change_id) - coalesce(c1.Merged,0) - coalesce(c2.Abandoned,0) "Not Reviewed",
	coalesce(c3.개발자수,0) "개발자수",
	coalesce(c4.Review소요일_1일이내,0) "Review소요일(1일이내)",
	coalesce(c5.Review소요일_2일이내,0) "Review소요일(2일이내)",
	coalesce(c6.Review소요일_2일이상,0) "Review소요일(2일이상)",
	min(c.created_on) "최초create일",
	max(c.created_on) "최근create일"
from changes c
	left join (select b.dest_project_name "dest_project_name", 
										count(b.change_id) "Merged"
						from   changes b
						where  b.`status` = 'M' 
					  and    b.created_on < @end
	  				  and    b.created_on >= @start
						group by b.dest_project_name) c1 
	          on (c.dest_project_name = c1.dest_project_name)
	left join (select b1.dest_project_name "dest_project_name", 
										count(b1.change_id) "Abandoned"
						from   changes b1
						where  b1.`status` = 'A' 
		 				and    b1.created_on < @end
	   				and    b1.created_on >= @start
						group by b1.dest_project_name) c2 
						on (c.dest_project_name = c2.dest_project_name)
	left join (select b2.dest_project_name "dest_project_name", 
										count(distinct(b2.owner_account_id)) "개발자수"
	  		  	from   changes b2
						where  b2.created_on  < @end
	   				and    b2.created_on >= @start
						group by b2.dest_project_name) c3 
						on (c.dest_project_name = c3.dest_project_name)
	left join (select b3.dest_project_name, count(*) "Review소요일_1일이내"
						from changes b3
						WHERE b3.created_on < @end AND b3.created_on >= @start
						and   b3.`status` in ('M','A')
						and   TIMESTAMPDIFF(minute,b3.created_on,b3.last_updated_on) <= 1440
						group by b3.dest_project_name) c4 
						on (c.dest_project_name = c4.dest_project_name)
	left join (select b4.dest_project_name, count(*) "Review소요일_2일이내"
						from changes b4
						WHERE b4.created_on < @end AND b4.created_on >= @start
						and   b4.`status` in ('M','A')
						and   TIMESTAMPDIFF(minute,b4.created_on,b4.last_updated_on) <= 2880
						and   TIMESTAMPDIFF(minute,b4.created_on,b4.last_updated_on) > 1440
						group by b4.dest_project_name) c5 
						on (c.dest_project_name = c5.dest_project_name)
	left join (select b5.dest_project_name, count(*) "Review소요일_2일이상"
						from changes b5
						WHERE b5.created_on < @end AND b5.created_on >= @start
						and   b5.`status` in ('M','A')
						and   TIMESTAMPDIFF(minute,b5.created_on,b5.last_updated_on) > 2880
						group by b5.dest_project_name) c6 
						on (c.dest_project_name = c6.dest_project_name)
where c.created_on  < @end 
and   c.created_on >= @start 
group by c.dest_project_name
order by 1;