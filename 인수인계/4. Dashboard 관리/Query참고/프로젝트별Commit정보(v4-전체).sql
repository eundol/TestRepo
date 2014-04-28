select md.project "PJT name",
		 a.developers "Push한 개발자수",
		 md.persons "전체 개발자수",
		 concat(round((a.developers / md.persons) * 100, 0),'%') "참여율",
		 a.merge "Merge",
		 a.abandon "Abandon",
		 a.open "Open",
		 a.push "Total",
		 a.push - COALESCE(b.push,'0') "전주대비 Push수"
from master_developer md
right join 
	(select mp.project_name, 
			  mp.team, 
			  count(distinct(c.owner_account_id)) "developers", 
			  count(c.change_id) "push", 
			  sum(case c.`status` when 'M' then '1' else '0' end) "merge",
			  sum(case c.`status` when 'A' then '1' else '0' end) "abandon",
			  sum(case c.`status` when 'n' then '1' else '0' end) "open"
	from master_project mp
	left join changes c on (upper(mp.repository) = upper(c.dest_project_name))
	join master_week w on (c.created_on between w.`start` and w.`end`)
	where w.week = '1306'
	and   mp.`status` like '사용중'
	group by mp.project_name) a on (md.project = a.project_name)
left join
   (select mp1.project_name, 
			  mp1.team, 
			  count(distinct(c1.owner_account_id)) "developers", 
			  count(c1.change_id) "push", 
			  sum(case c1.`status` when 'M' then '1' else '0' end) "merge",
			  sum(case c1.`status` when 'A' then '1' else '0' end) "abandon",
			  sum(case c1.`status` when 'n' then '1' else '0' end) "open"
	from master_project mp1
	left join changes c1 on (upper(mp1.repository) = upper(c1.dest_project_name))
	join master_week w1 on (c1.created_on between w1.`start` and w1.`end`)
	where w1.week = '1305'
	and   mp1.`status` like '사용중'
	group by mp1.project_name) b on (a.project_name = b.project_name)