SELECT p.project_name AS Project, 
	    SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon, 
		 SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, 
		 SUM(CASE c.status WHEN 'N' THEN '1' ELSE '0' END) AS OPEN
FROM changes c
JOIN master_week w ON (c.created_on BETWEEN w.start AND w.end)
JOIN master_project p ON (c.dest_project_name = p.repository)
WHERE p.status LIKE '사용중' AND p.team LIKE 'ProductPlatform' AND w.week LIKE (
SELECT WEEK
FROM master_week w2
WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end)
GROUP BY p.project_name;