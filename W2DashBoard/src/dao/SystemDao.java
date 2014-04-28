package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import common.JdbcTemplate;
import entity.SystemInfo;

public class SystemDao {

	PreparedStatement psmt;
	ResultSet rset;
	String query;
	int updateFlag;
	
	public void getSeverityInfo(Connection conn, SystemInfo info) {
		query = "select critical, major, minor from TB_System_Severity";
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			while(rset.next()){
				info.setCritical(rset.getInt("critical"));
				info.setMajor(rset.getInt("major"));
				info.setMinor(rset.getInt("minor"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
	
	public void close(){
		JdbcTemplate.close(rset);
		JdbcTemplate.close(psmt);
	}
}
