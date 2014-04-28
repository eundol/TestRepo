
"/* Update Ranking(주간)*/\n" +
"\n" + 
"/* 전체*/\n" + 
"SELECT\n" + 
"mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 7 DESC, 5 DESC;\n" + 
"\n" + 
"/* CommonPlatform*/\n" + 
"SELECT\n" + 
"mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 7 DESC, 5 DESC;\n" + 
"\n" + 
"/* ProductPlatform*/\n" + 
"SELECT\n" + 
"mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 7 DESC, 5 DESC;\n" + 
"\n" + 
"/* Component*/\n" + 
"SELECT\n" + 
"mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'Component'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 7 DESC, 5 DESC;";