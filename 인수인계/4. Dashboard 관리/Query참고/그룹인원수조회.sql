/*
★2곳의 Group Name을 수정하여 사용합니다★
한번의 쿼리로 그룹 속 그룹원(sysmanager제외)까지 중복없이 count합니다
*/
select name, description, count(distinct(account_id)) 'Group내 개발자수'
from
(select n.name, g.description, m.account_id
from account_groups g
join account_group_names n on (g.group_id = n.group_id)
join account_group_members m on (g.group_id = m.group_id)
where n.name like 'D_[ODS]SmartTV_ide'
and m.account_id != '34'
union all
select '', '', m1.account_id
from account_group_names n1
join account_group_includes g1 on (n1.group_id = g1.group_id)
join account_group_members m1 on (g1.include_id = m1.group_id)
where n1.name like 'D_[ODS]SmartTV_ide'
and m1.account_id != '34'
) end;