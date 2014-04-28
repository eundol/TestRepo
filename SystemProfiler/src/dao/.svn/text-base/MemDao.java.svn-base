package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.CpuEntity;
import entity.MemEntity;
import entity.SmemEntity;

public class MemDao {
	
	private Connection conn;
	
	public MemDao(Connection conn) {
		this.conn = conn;
	}
	
	public void getMemoryInfo(String id, ArrayList<MemEntity> memoryInfo) {
		System.out.println("getMemoryInfo-dao **");
		MemEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select m.sequence, m.total, m.used, m.free, m.shared, m.buffers, m.cached from mem_usage m where profile_id = ?";
		int cnt = 0;
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new MemEntity(id, rset.getInt(1), rset.getLong(2), rset.getLong(3), rset.getLong(4), rset.getLong(5), rset.getLong(6), rset.getLong(7));
					memoryInfo.add(entity);
					cnt++;
				}
			} catch (Exception e) {
				System.out.println("## getMemoryInfo-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			System.out.println("cnt : " + cnt);
		return;
	}

	public void getSequenceMemoryInfo(String id, String sequence,
			MemEntity sequenceInfo) {
		System.out.println("getMemoryInfo-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select m.sequence, m.total, m.used, m.free, m.shared, m.buffers, m.cached from mem_usage m where profile_id = ? and sequence = ?";
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				psmt.setString(2, sequence);
				rset = psmt.executeQuery();
				while(rset.next()){
					sequenceInfo = new MemEntity(id, rset.getInt(1), rset.getInt(2), rset.getInt(3), rset.getInt(4), rset.getInt(5), rset.getInt(6), rset.getInt(7));
				}
			} catch (Exception e) {
				System.out.println("## getSequenceMemoryInfo-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		return;
	}

	public void getSmemInfo(String id, String sortParam, String order, ArrayList<SmemEntity> smemInfo, String option) {
		System.out.println("getSmemInfo-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		SmemEntity smemEntity = null;
		String query = "SELECT result.name_start \"process\", result.pss_start, result.pss_end, result.pss_diff, result.uss_start, result.uss_end, result.uss_diff, if(result.pss_diff<0,result.pss_diff*-1,result.pss_diff) \"s_pss_diff\", if(result.uss_diff<0,result.uss_diff*-1,result.uss_diff) \"s_uss_diff\"\n" +
						"FROM\n" + 
						"(\n" + 
						"SELECT start1.name_start, start1.pss_start, end1.pss_end, IFNULL(end1.pss_end,0) - start1.pss_start \"pss_diff\", start1.uss_start, end1.uss_end, IFNULL(end1.uss_end,0) - start1.uss_start \"uss_diff\"\n" + 
						"FROM\n" + 
						"((\n" + 
						"SELECT s.name \"name_start\", SUM(s.pss) \"pss_start\", SUM(s.uss) \"uss_start\", COUNT(s.pid) \"pid_start\", s.profile_id \"profile_id_start\", s.sequence \"sequence_start\"\n" + 
						"FROM smem_usage s\n" + 
						"WHERE s.profile_id = ? AND s.sequence = 1\n" + 
						"GROUP BY s.name) start1\n" + 
						"LEFT JOIN\n" + 
						"            (\n" + 
						"SELECT s1.name \"name_end\", SUM(s1.pss) \"pss_end\", SUM(s1.uss) \"uss_end\", COUNT(s1.pid) \"pid_end\", s1.profile_id \"profile_id_end\", s1.sequence \"sequence_end\"\n" + 
						"FROM smem_usage s1\n" + 
						"WHERE s1.profile_id = ? AND s1.sequence = 2\n" + 
						"GROUP BY s1.name) end1 ON (start1.name_start = end1.name_end)) UNION\n" + 
						"            (\n" + 
						"SELECT end2.name_end, start2.pss_start, end2.pss_end, end2.pss_end - IFNULL(start2.pss_start,0) \"pss_diff\", start2.uss_start, end2.uss_end, end2.uss_end - IFNULL(start2.uss_start,0) \"uss_diff\"\n" + 
						"FROM\n" + 
						"            (\n" + 
						"SELECT s.name \"name_start\", SUM(s.pss) \"pss_start\", SUM(s.uss) \"uss_start\", COUNT(s.pid) \"pid_start\", s.profile_id \"profile_id_start\", s.sequence \"sequence_start\"\n" + 
						"FROM smem_usage s\n" + 
						"WHERE s.profile_id = ? AND s.sequence = 1\n" + 
						"GROUP BY s.name) start2\n" + 
						"RIGHT JOIN\n" + 
						"            (\n" + 
						"SELECT s1.name \"name_end\", SUM(s1.pss) \"pss_end\", SUM(s1.uss) \"uss_end\", COUNT(s1.pid) \"pid_end\", s1.profile_id \"profile_id_end\", s1.sequence \"sequence_end\"\n" + 
						"FROM smem_usage s1\n" + 
						"WHERE s1.profile_id = ? AND s1.sequence = 2\n" + 
						"GROUP BY s1.name) end2 ON (start2.name_start = end2.name_end))\n" + 
						"            ) result\n ORDER BY ";
		
			query +=  sortParam + " ";
			query +=  order;
			query +=  option;
		
			System.out.println(query);
			
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				psmt.setString(2, id);
				psmt.setString(3, id);
				psmt.setString(4, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					smemEntity = new SmemEntity(id, rset.getString(1), rset.getLong(2), rset.getLong(3), rset.getLong(4), rset.getLong(5), rset.getLong(6), rset.getLong(7));
					smemInfo.add(smemEntity);
				}
			} catch (Exception e) {
				System.out.println("## getSmemInfo-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		return;
	}
	
}