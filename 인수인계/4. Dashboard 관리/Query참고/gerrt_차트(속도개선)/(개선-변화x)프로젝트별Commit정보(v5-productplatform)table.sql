select pl.project_name as PJTname,
	    COALESCE(output.developers,'0') as committers,
	    md0.persons as Persons,
	    COALESCE(output.participationrate,'0%') as participationrate,
	    COALESCE(output.Merge,'0') as Merge,
	    COALESCE(output.Abandon,'0') as Abandon,
	    COALESCE(output.Open,'0') as Open,
	    COALESCE(output.Total,'0') as Total,
	    COALESCE(output.Total,'0')-COALESCE(b.push,'0') as compare
from
(select mp0.project_name 
from master_project mp0
where mp0.team like 'ProductPlatform'
and   mp0.status like '사용중'
group by mp0.project_name) pl
left join
(select md.project,
		 a.developers,
		 md.persons,
		 concat(round((a.developers / md.persons) * 100, 0),'%') as participationrate,
		 a.merge as Merge,
		 a.abandon as Abandon,
		 a.open as Open,
		 a.push as Total,
		 a.team
from master_developer md
right join 
	(select mp.project_name, 
			  mp.team, 
			  count(distinct(c.owner_account_id)) as developers, 
			  count(c.change_id) as push, 
			  sum(case c.status when 'M' then '1' else '0' end) as merge,
			  sum(case c.status when 'A' then '1' else '0' end) as abandon,
			  sum(case c.status when 'n' then '1' else '0' end) as open
	from master_project mp
	left join changes c on (mp.repository = c.dest_project_name)
	join master_week w on (c.created_on between w.start and w.end)
	where w.week = (select week from master_week w2
						 where date_add(sysdate(), interval-7 day) between w2.start and w2.end)
	and   mp.`status` like '사용중'
	and   mp.team like 'ProductPlatform'
	group by mp.project_name) a on (md.project = a.project_name)) output on (pl.project_name = output.project)
left join master_developer md0 on (pl.project_name = md0.project)
left join
   (select mp1.project_name,
			  count(c1.change_id) as push
	from master_project mp1
	left join changes c1 on (mp1.repository = c1.dest_project_name)
	join master_week w1 on (c1.created_on between w1.start and w1.end)
	where w1.week = (select week from master_week w3
						  where date_add(sysdate(), interval-14 day) between w3.start and w3.end)
	and   mp1.`status` like '사용중'
   and   mp1.team like 'ProductPlatform'
	group by mp1.project_name) b on (pl.project_name = b.project_name)