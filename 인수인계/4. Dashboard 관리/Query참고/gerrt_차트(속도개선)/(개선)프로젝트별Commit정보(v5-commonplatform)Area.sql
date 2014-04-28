SELECT CONCAT('W',w.week) AS WEEK, COALESCE(output.Open,0) AS OPEN, COALESCE(output.Merge,0) AS Merge, COALESCE(output.Abandon,0) AS Abandon
FROM
(
SELECT c.inweek AS WEEK, SUM(CASE UPPER(c.`status`) WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE UPPER(c.`status`) WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE UPPER(c.`status`) WHEN 'A' THEN '1' ELSE '0' END) AS Abandon
FROM changes c
LEFT JOIN master_project s ON (c.dest_project_name = s.repository)
WHERE c.inweek >= (
SELECT WEEK
FROM master_week w2
WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND c.inweek <= (
SELECT WEEK
FROM master_week w2
WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND s.status IN ('사용중') AND 	s.team LIKE 'commonplatform'
GROUP BY c.inweek) output
RIGHT JOIN 
(
SELECT WEEK
FROM master_week w1
WHERE w1.week >= (
SELECT WEEK
FROM master_week w2
WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND w1.week <= (
SELECT WEEK
FROM master_week w3
WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w3.start AND w3.end)) w ON (output.Week = w.week);