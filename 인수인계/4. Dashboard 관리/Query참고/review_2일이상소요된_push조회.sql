/*
★Review일 2일 이상인 push를 조회(파일 수 정보 추가  - 신뢰도는 떨어짐. 참고만)★
시작일과 종료일 변경후 사용
*/

set @start = '13-01-07'; /*시작일*/
set @end = '13-01-14'; /*종료일 +1*/

select c.change_key,
		 c.created_on,
		 c.last_updated_on,
		 TIMEDIFF(c.last_updated_on,c.created_on) "소요시간",
		 c.nbr_patch_sets,
		 b2.comment수, 
		 b.파일수,
		 c.subject,
		 c.`status`,
		 c.change_id
	from changes c
	left join 
	(select c1.change_id,
		 	  coalesce(b1.파일수, '정보없음') "파일수"
					from changes c1
					left join 
						(select apr.change_id, count(distinct(apr.file_name)) "파일수"
							from account_patch_reviews apr
							where change_id in (select ch.change_id
																	from changes ch
																	where ch.created_on < @end
																	and   ch.created_on >= @start)
							group by apr.change_id) 
						  b1	on (c1.change_id = b1.change_id)
					where c1.created_on < @end
					and   c1.created_on >= @start
					order by 파일수+0 desc) b on (c.change_id = b.change_id)
   left join
   (select cmsg.change_id, 
	        COALESCE(count(cmsg.message),0) "comment수"
	  from change_messages cmsg
	  group by cmsg.change_id) b2 on (c.change_id = b2.change_id)
	WHERE c.created_on < @end AND c.created_on >= @start
	and   c.`status` in ('M','A')
	and   TIMESTAMPDIFF(minute,c.created_on,c.last_updated_on) > 2880
	order by 4;