/* Update Ranking(주간)*/

/* 전체*/
SELECT 
mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) "Task", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) "Sub-task", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) "Story", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) "Bug", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) "Requirement", COUNT(i.issue_key) "Total"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)
GROUP BY mp.dp_project
ORDER BY 7 DESC, 5 DESC;

/* CommonPlatform*/
SELECT 
mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) "Task", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) "Sub-task", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) "Story", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) "Bug", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) "Requirement", COUNT(i.issue_key) "Total"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)
GROUP BY mp.dp_project
ORDER BY 7 DESC, 5 DESC;

/* ProductPlatform*/
SELECT 
mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) "Task", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) "Sub-task", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) "Story", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) "Bug", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) "Requirement", COUNT(i.issue_key) "Total"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)
GROUP BY mp.dp_project
ORDER BY 7 DESC, 5 DESC;

/* Component*/
SELECT 
mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) "Task", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) "Sub-task", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) "Story", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) "Bug", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) "Requirement", COUNT(i.issue_key) "Total"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'Component'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)
GROUP BY mp.dp_project
ORDER BY 7 DESC, 5 DESC;