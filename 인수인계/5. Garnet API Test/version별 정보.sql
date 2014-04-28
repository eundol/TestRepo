-- alter table TB_Garnet_API AUTO_INCREMENT = 242;
-- alter table TB_Garnet_API_Version AUTO_INCREMENT = 13;

select version_id, version from TB_Garnet_API_Version;

set @previous = 'v0.7.2';
set @now = 'v0.7.3';

select * from
(select v.version, a.name
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
where v.version = @previous) p 
left join
(select v.version, a.name
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
where v.version = @now) n on (p.name = n.name)
union
select * from
(select v.version, a.name
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
where v.version = @previous) p 
right join
(select v.version, a.name
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
where v.version = @now) n on (p.name = n.name);

select v.version, a.name, p.property_name, p.`type`, p.`default`
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @previous;

select v.version, a.name, p.property_name, p.`type`, p.`default`
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @now;

select *
from
(select v.version, a.name, sum(if(p.`type` = "published",1,0)) "published", sum(if(p.`type` = "public",1,0)) "public", sum(if(p.`type` = "function",1,0)) "function"
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
left join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @previous
group by v.version, a.name) pre
left join
(select v.version, a.name, sum(if(p.`type` = "published",1,0)) "published", sum(if(p.`type` = "public",1,0)) "public", sum(if(p.`type` = "function",1,0)) "function"
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
left join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @now
group by v.version, a.name) now on (pre.name = now.name)
union
select *
from
(select v.version, a.name, sum(if(p.`type` = "published",1,0)) "published", sum(if(p.`type` = "public",1,0)) "public", sum(if(p.`type` = "function",1,0)) "function"
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
left join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @previous
group by v.version, a.name) pre
right join
(select v.version, a.name, sum(if(p.`type` = "published",1,0)) "published", sum(if(p.`type` = "public",1,0)) "public", sum(if(p.`type` = "function",1,0)) "function"
from TB_Garnet_API_Version v
join TB_Garnet_API a on (v.version_id = a.version_id)
left join TB_Garnet_API_Public p on (a.api_id = p.api_id)
where v.version = @now
group by v.version, a.name) now on (pre.name = now.name);
