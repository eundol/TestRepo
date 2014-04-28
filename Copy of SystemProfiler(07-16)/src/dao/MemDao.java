package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.CpuEntity;
import entity.MemEntity;

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
					entity = new MemEntity(id, rset.getInt(1), rset.getInt(2), rset.getInt(3), rset.getInt(4), rset.getInt(5), rset.getInt(6), rset.getInt(7));
					memoryInfo.add(entity);
					cnt++;
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
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
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		return;
	}
	
}
