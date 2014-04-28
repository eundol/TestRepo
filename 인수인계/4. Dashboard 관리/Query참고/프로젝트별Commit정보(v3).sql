/*
★주차를 바꿔서 사용★
---칼럽내용---
1.   커밋수(push된 시점기준)
2.   M된 갯수
2-1. M비율
3.   A된 갯수
3-1. A비율
3-2. 미처리건(Push되었지만 Review가 되지않음)
4.   기간동안 open한 개발자수
5,6. 최초, 최근 create일(push된 시간)
7.   주차
8.   팀
*/
set @week = '1305'; /*주차*/
set @start =  (select master_week.`start`
				  from master_week
				  where master_week.week like @week);
set @end = (select master_week.`end`
				  from master_week
				  where master_week.week like @week);
select mp.project_name "project",
	    sum(origin.Commited) "Commited",
	    sum(origin.Merged) "Merged",
	    concat(round((coalesce(sum(origin.Merged),0) / sum(origin.Commited)) * 100),'%') "Merged 비율",
		 sum(origin.Abandoned) "Abandoned",
		 concat(round((coalesce(sum(origin.Abandoned),0) / sum(origin.Commited)) * 100),'%') "Abandoned 비율",
		 sum(origin.Commited) - coalesce(sum(origin.Merged),0) - coalesce(sum(origin.Abandoned),0) "Not Reviewed",
		 dep.참여개발자 as "개발자수",
		 min(origin.최초create일) "최초create일",
		 max(origin.최근create일) "최근create일",
		 concat('W',@week) as "주차",
		 mp.team as "team"
from  master_project mp
join
	(select 
		c.dest_project_name, 
		count(c.change_id) "Commited", 
		coalesce(c1.Merged,0) "Merged",
		concat(round((coalesce(c1.Merged,0) / count(c.change_id)) * 100),'%') "Merged 비율", 
		coalesce(c2.Abandoned,0) "Abandoned",
		concat(round((coalesce(c2.Abandoned,0) / count(c.change_id)) * 100),'%') "Abandoned 비율",
		count(c.change_id) - coalesce(c1.Merged,0) - coalesce(c2.Abandoned,0) "Not Reviewed",
		'' as "개발자수",
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
	where c.created_on  < @end 
	and   c.created_on >= @start 
	group by c.dest_project_name) origin on (upper(mp.repository) = upper(origin.dest_project_name))
left join 
   (select p9.project_name,
	coalesce(count(distinct(c9.owner_account_id)),0) "참여개발자" from changes c9
	left join master_project p9 on (upper(c9.dest_project_name) = upper(p9.repository))
	where p9.`status` like '사용중'
	and   c9.created_on  < @end 
	and   c9.created_on >= @start 
	group by p9.project_name) dep on (mp.project_name = dep.project_name)
where mp.`status` like '사용중'
group by mp.project_name
;