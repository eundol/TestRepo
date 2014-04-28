/*
★2군데 날짜(시작일)을 바꿔서 사용★
---칼럽내용---
1. change_id
2. dest_project_name
3. 파일수(없는경우 정보없음)
4. change_key
etc
*/

select c.change_id,
		 c.dest_project_name,
		 c.subject,
		 coalesce(b.파일수, '정보없음') "파일수", 
		 c.change_key,
		 c.created_on,
		 c.last_updated_on,
		 c.sort_key,
		 c.owner_account_id,
		 c.dest_branch_name,
		 c.`open`,
		 c.`status`,
		 c.nbr_patch_sets,
		 c.current_patch_set_id
from changes c
left join 
	(select apr.change_id, count(distinct(apr.file_name)) "파일수"
		from account_patch_reviews apr
		where change_id in (select ch.change_id
												from changes ch
												where ch.created_on <= 'SYSDATE'
												and   ch.created_on >= '13-01-07')
		group by apr.change_id) 
	  b	on (c.change_id = b.change_id)
where c.created_on <= 'SYSDATE'
and   c.created_on >= '13-01-07'
order by 파일수+0 desc
;