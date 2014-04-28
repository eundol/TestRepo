package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BatInfo;

public class BatDao {
	
	PreparedStatement psmt;
	ResultSet rset;
	String query;
	int updateFlag;
	
	public void getBatResult(Connection conn, ArrayList<BatInfo> list) {
		query = "select * from TB_BAT_Result order by 2, 1";
		
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			while(rset.next()){
				list.add(new entity.BatInfo(rset.getString("build"),rset.getString("date"),rset.getString("result"),rset.getInt("pass"),rset.getInt("total"),rset.getInt("pass_rate")));
//				System.out.println(rset.getString("build")+rset.getString("date")+rset.getString("result")+rset.getInt("pass")+rset.getInt("total")+rset.getInt("pass_rate"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public boolean addBatResult(Connection conn, BatInfo insertData) {
		query = "insert into TB_BAT_Result values (?,?,?,?,?,?)";
		boolean result = true;
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, insertData.getBuild());
			psmt.setString(2, insertData.getDate());
			psmt.setString(3, insertData.getResult());
			psmt.setInt(4, insertData.getPass());
			psmt.setInt(5, insertData.getTotal());
			psmt.setInt(6, insertData.getPassRate());
			updateFlag = psmt.executeUpdate();
			JdbcTemplate.commit(conn);
		} catch (SQLException e) {
			result = false;
			JdbcTemplate.rollback(conn);
			e.printStackTrace();
		} finally {
			close();
		}
		return result;
	}

	public void deleteBatResult(Connection conn, String build) {
		query = "delete from TB_BAT_Result where build = ?";
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, build);
			updateFlag = psmt.executeUpdate();
			JdbcTemplate.commit(conn);
		} catch (SQLException e) {
			JdbcTemplate.rollback(conn);
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
