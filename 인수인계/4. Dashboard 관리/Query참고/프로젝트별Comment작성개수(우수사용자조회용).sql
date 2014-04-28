/*comment작성정보 조회.(사용자별)*/

/*날짜별*/

set @start = '13-05-16'; /*시작일*/
set @end = '13-06-16'; /*종료일 +1*/

select a.full_name, a.preferred_email, count(*) from change_messages m 
join accounts a on (m.author_id = a.account_id)
where m.written_on >= @start
and   m.written_on < @end
and   coalesce(m.author_id,'34') not in ('34', '0')
and   LENGTH(m.message) > 25
and   m.message not like '%Looks good to me, approved\n\n'
and   m.message not like '%Looks good to me, but someone else must approve\n\n'
and   m.message not like '%I would prefer that you didn\'t submit this\n\n'
and   m.message not like '%: Rebased'
and   m.message not like '%Do not submit\n\n'
and   m.message not like '%: verified\n\n'
and   m.message not like '%: Abandoned'
and   m.message not like 'Change has been successfully merged into the git repository.'
and   m.message not like 'Change has been successfully pushed.'
group by m.author_id
order by 3 desc;

/* 특정 사용자의 메세지 조회 */
set @name = '정천성';

select * from change_messages m 
join accounts a on (m.author_id = a.account_id)
where m.written_on >= @start
and   m.written_on < @end
and   coalesce(m.author_id,'34') not in ('34', '0')
and   LENGTH(m.message) > 25
and   m.message not like '%Looks good to me, approved\n\n'
and   m.message not like '%Looks good to me, but someone else must approve\n\n'
and   m.message not like '%I would prefer that you didn\'t submit this\n\n'
and   m.message not like '%: Rebased'
and   m.message not like '%Do not submit\n\n'
and   m.message not like '%: verified\n\n'
and   m.message not like '%: Abandoned'
and   m.message not like 'Change has been successfully merged into the git repository.'
and   m.message not like 'Change has been successfully pushed.'
and   a.full_name = @name
order by 2 desc;