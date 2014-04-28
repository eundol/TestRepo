/*테이블용 query*/
select 
   mp.dp_project "Project",
	count(i.issue_id) "Issue 건수",
	sum(not(isnull(i.duedate))) "Due date 입력수",
	concat(round((sum(not(isnull(i.duedate))) / count(i.issue_id)) * 100, 0), '%') as "Due Date 입력율",
	sum(if(isnull(i.duedate)=0 && i.status not in ('Closed','Resolved') && datediff(now(),i.duedate) > 0,1,0)) as "지연 Issue 건수"
from jira_issue i
join (select 
			m.project, 
		   m.project_key,
			m.dp_project,
			m.group 
		from master_project m
		where m.visible = 'Y'
		and   m.group = 'ProductPlatform'
		group by project_key) mp on (i.project_key = mp.project_key)  
group by mp.dp_project;

/*속도 문제로 나눠서 아래 쿼리를 사용합니다.*/
/*1번*/
SELECT a.dp_project, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율
FROM
(
SELECT mp.dp_project "dp_project", COUNT(i.issue_id) "Issue건수"
FROM jira_issue i
JOIN (
SELECT 
			m.project, 
		 m.project_key,
			m.dp_project,
			m.group
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
GROUP BY mp.dp_project) a
JOIN
(
SELECT mp.dp_project "dp_project", COUNT(i.issue_id) "진행Issue건수", SUM(NOT(ISNULL(i.duedate))) "DueDate입력수", CONCAT(ROUND((SUM(NOT(ISNULL(i.duedate))) / COUNT(i.issue_id)) * 100, 0), '%') AS "DueDate입력율"
FROM jira_issue i
JOIN (
SELECT 
			m.project, 
		 m.project_key,
			m.dp_project,
			m.group
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.`status` IN ('Open','In Progress','Reopened')
GROUP BY mp.dp_project) b ON (a.dp_project = b.dp_project)
/*2번*/
select r1.dp_project "Project",
		 COALESCE(r2.count,0) as "지연 Issue 건수"
from
		(select 
			m.project, 
		   m.project_key,
		 	m.dp_project,
			m.group
		from 
		master_project m
		where m.visible = 'Y'
			and   m.group = 'ProductPlatform'
		group by dp_project) r1
left join
		(select 
		   mp.dp_project,
			count(i.issue_id) "count"
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
					and   m.group = 'ProductPlatform'
				group by project_key) mp on (i.project_key = mp.project_key)
		where 
			isnull(i.duedate) = 0
			and i.`status` not in ('Closed','Resolved')
			and   datediff(now(),i.duedate) > 0
		group by mp.dp_project) r2 on (r1.dp_project = r2.dp_project);