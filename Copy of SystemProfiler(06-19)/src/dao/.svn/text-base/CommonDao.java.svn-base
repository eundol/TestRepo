package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.StringTokenizer;

import common.JdbcTemplate;

import entity.CpuEntity;
import entity.CpuSearchEntity;

public class CommonDao {

	private Connection conn;
	
	public CommonDao(Connection conn) {
		this.conn = conn;
	}

	public CpuSearchEntity getObjectInfo(String id) {
		System.out.println("getObjectInfo-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		CpuSearchEntity cpuSearch = null;
		String query = "select profile_id,created,file_name,test_case_id,test_date,user_id from cpu_usage where profile_id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();
			while(rset.next()){
				cpuSearch = new CpuSearchEntity(rset.getString(1),rset.getString(2).substring(5, 16),rset.getString(3),rset.getString(4),rset.getString(5),rset.getString(6));
			}
		} catch (Exception e) {
			System.out.println("## getCpuTable-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
		}
		return cpuSearch;
	}
}