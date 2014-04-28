/*
========Red_Rose 프로젝트=========
★5군데 날짜(시작일)을 바꿔서 사용★
---칼럽내용---
1.   커밋수(push된 시점기준)
2.   M된 갯수
2-1. M비율
3.   A된 갯수
3-1. A비율
3-2. 미처리건(Push되었지만 Review가 되지않음)
4.   기간동안 push한 개발자수
5.   subject작성(20자이상)
6.   subject작성(20자미만)
7.   subject 20자 이상 비율
8,9. 최초,최근 create일(push된 시간)
*/
select 'Red_Rose/Rosebud/*' as "프로젝트", 
        sum(result.Commited) "Commited",
        sum(result.Merged) "Merged",
        concat(round((sum(result.Merged) / sum(result.Commited)) * 100),'%') "Merged 비율",
        sum(result.Abandoned) "Abandoned",
        concat(round((sum(result.Abandoned) / sum(result.Commited)) * 100),'%') "Abandoned 비율",
        sum(result.Commited) - sum(result.Merged) - sum(result.Abandoned) "Not Reviewed",
        sum(result.참여개발자수) "참여개발자수",
        sum(result.20자이상) "20자이상",
        sum(result.20자미만) "20자미만",
        concat(round((sum(result.20자이상) / sum(result.Commited)) * 100),'%') "20자이상 비율",
        min(result.최초create일) as "최초create일",
        max(result.최근create일) as "최근create일"
from
	(select 
		c.dest_project_name, 
		count(c.change_id) "Commited", 
		coalesce(c1.Merged,0) "Merged",
		concat(round((coalesce(c1.Merged,0) / count(c.change_id)) * 100),'%') "Merged 비율", 
		coalesce(c2.Abandoned,0) "Abandoned",
		concat(round((coalesce(c2.Abandoned,0) / count(c.change_id)) * 100),'%') "Abandoned 비율",
		coalesce(c3.개발자수,0) "참여개발자수",
		coalesce(c4.20자이상,0) "20자이상",
		count(c.change_id)-coalesce(c4.20자이상,0) "20자미만",
		concat(round((coalesce(c4.20자이상,0) / count(c.change_id)) * 100),'%') "20자이상 비율",
		min(c.created_on) "최초create일",
		max(c.created_on) "최근create일"
	from changes c
		left join (select b.dest_project_name "dest_project_name", 
											count(b.change_id) "Merged"
							from   changes b
							where  b.`status` = 'M' 
						  and    b.created_on <= 'SYSDATE'
		  				  and    b.created_on >= '13-01-07'
							group by b.dest_project_name) c1 
		          on (c.dest_project_name = c1.dest_project_name)
		left join (select b1.dest_project_name "dest_project_name", 
											count(b1.change_id) "Abandoned"
							from   changes b1
							where  b1.`status` = 'A' 
			 				and    b1.created_on <= 'SYSDATE'
		   				and    b1.created_on >= '13-01-07'
							group by b1.dest_project_name) c2 
							on (c.dest_project_name = c2.dest_project_name)
		left join (select b2.dest_project_name "dest_project_name", 
											count(distinct(b2.owner_account_id)) "개발자수"
		  		  	from   changes b2
							where  b2.created_on <= 'SYSDATE'
		   				and    b2.created_on >= '13-01-07'
							group by b2.dest_project_name) c3 
							on (c.dest_project_name = c3.dest_project_name)
		left join (select b3.dest_project_name, count(b3.subject) "20자이상"
							from changes b3
							where length(subject) >= 20
						  and    b3.created_on <= 'SYSDATE'
		   				and    b3.created_on >= '13-01-07'
							group by b3.dest_project_name) c4 
							on (c.dest_project_name = c4.dest_project_name)
	where c.created_on <= 'SYSDATE'
	and   c.created_on >= '13-01-07'
	group by c.dest_project_name
	order by 1) result
where result.dest_project_name like '%/Rosebud/%';