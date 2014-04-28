/*
git-gerrit 우수 사용자 조회 (Push순 - 100자이상log개수로 정렬됨)
날짜바꿔서 사용
*/
set @start = '13-02-16'; /*시작일*/
set @end = '13-03-16'; /*종료일 +1*/
select a.account_id, a.full_name, a.preferred_email, count(c.change_id) "Push개수", COALESCE(c1.100자이상log개수,0), min(c.created_on) "최초creat", max(c.created_on) "최근creat"
from changes c
join accounts a on (c.owner_account_id = a.account_id)
left join (select  a.account_id, a.full_name, a.preferred_email, count(c.change_id) "100자이상log개수"
				from changes c
				join accounts a on (c.owner_account_id = a.account_id)
				where c.created_on >= @start
				and   c.created_on < @end
				and   length(c.subject) >= 100
				group by c.owner_account_id) c1 on (c.owner_account_id = c1.account_id)
where c.created_on >= @start
and   c.created_on < @end
group by c.owner_account_id
order by 4 desc, 5 desc;

/*
특정 순위인 사람의 push를 조회합니다.
*/
/*
몇위의 push를 조회하시겠습니까?
*/
set @순위 = '1';

select y.full_name, y.preferred_email, z.dest_project_name, z.subject, z.change_key, z.change_id
from changes z
join
(
select account_id, full_name, preferred_email
from
(
select @rownum := @rownum + 1 as rownum,
	    p.*
from
(
select a.account_id, a.full_name, a.preferred_email, count(c.change_id) "Push개수", c1.100자이상log개수, min(c.created_on) "최초creat", max(c.created_on) "최근creat"
from changes c
join accounts a on (c.owner_account_id = a.account_id)
left join (select  a.account_id, a.full_name, a.preferred_email, count(c.change_id) "100자이상log개수"
				from changes c
				join accounts a on (c.owner_account_id = a.account_id)
				where c.created_on >= @start
				and   c.created_on < @end
				and   length(c.subject) >= 100
				group by c.owner_account_id) c1 on (c.owner_account_id = c1.account_id)
where c.created_on >= @start
and   c.created_on < @end
group by c.owner_account_id
) p , (select @rownum := 0) R
order by 5 desc
) p1
where rownum = @순위
) y on (z.owner_account_id = y.account_id)
where z.created_on >= @start
and   z.created_on < @end
;