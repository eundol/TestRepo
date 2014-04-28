select   i.summary,
			i.issue_key
from jira_issue i
join 
	(select 
		m.project, 
	   m.project_key,
	 	m.dp_project,
		m.group
	from 
    	master_project m
		where m.visible = 'Y'
		group by project_key) mp on (i.project_key = mp.project_key)
where 
	isnull(i.duedate) = 0
	and   i.`status` not in ('Closed','Resolved')
	and   datediff(now(),i.duedate) > 0
   and   mp.dp_project = 'LG Web App Suite V.1.0 개발'