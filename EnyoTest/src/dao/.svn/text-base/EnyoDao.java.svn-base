package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import dataEntity.TestResultEntity;

public class EnyoDao {

	public void getTestResultList(Connection conn, ArrayList<TestResultEntity> testResultList, String date) {
		System.out.println("getTestResultEntity-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String dateOption = "";
		if(!(date == null || date.equals(""))){
			dateOption = "where SUBSTR(d.name,11,8) = '" + date + "'\n";
		}
		String query = 
				  "SELECT d.name, SUBSTR(d.name,11,8) \"name_sort\", d.version, d.start_time, COUNT(DISTINCT(d.api)) \"api\", COUNT(d.test_case) \"test_case\", SUM(IF(d.result = 'pass',1,0)) \"pass\", SUM(IF(d.result = 'fail',1,0)) \"fail\", SUM(IF(d.result = 'error',1,0)) \"error\", SEC_TO_TIME(SUM(TIME_TO_SEC(d.duration))) \"duration\"\n"
				+ "FROM daily_report d\n"
				+ dateOption
				+ "GROUP BY d.name, d.version, d.start_time\n"
				+ "ORDER BY SUBSTR(d.name,11,8);";
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			int cnt = 0;
			while (rset.next()) {
				testResultList.add(
						new TestResultEntity(
								rset.getString("name"),
								rset.getString("name_sort"),
								rset.getString("version"),
								rset.getString("start_time"),
								rset.getInt("api"),
								rset.getInt("test_case"),
								rset.getInt("pass"),
								rset.getInt("fail"),
								rset.getInt("error"),
								rset.getString("duration")
								));
				cnt++;
			}
			System.out.println("result : " + cnt + " rows");
		} catch (Exception e) {
			System.out.println("## getTestResultList-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getTestResultDetail(Connection conn, ArrayList<TestResultEntity> testResultList, String date, String component) {
		System.out.println("getTestResultDetail-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String dateOption = "";
		if(!(date == null || date.equals(""))){
			dateOption = "where SUBSTR(d.name,11,8) = '" + date + "'\n";
		}
		String componentOption = "";
		if(!(component == null || component.equals(""))){
			if(!dateOption.equals("")){
				componentOption = "and d.api = '" + component + "'\n";
			}else{
				componentOption = "where d.api = '" + component + "'\n";
			}
		}
		String query = 
				  "SELECT d.name, SUBSTR(d.name,11,8) \"name_sort\", d.version, d.start_time, d.api \"api\", COUNT(d.test_case) \"test_case\", SUM(IF(d.result = 'pass',1,0)) \"pass\", SUM(IF(d.result = 'fail',1,0)) \"fail\", SUM(IF(d.result = 'error',1,0)) \"error\", SEC_TO_TIME(SUM(TIME_TO_SEC(d.duration))) \"duration\"\n"
				+ "FROM daily_report d\n"
				+ dateOption
				+ componentOption
				+ "GROUP BY d.name, d.version, d.start_time, d.api\n"
				+ "ORDER BY SUBSTR(d.name,11,8);";
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			int cnt = 0;
			while (rset.next()) {
				testResultList.add(
						new TestResultEntity(
								rset.getString("name"),
								rset.getString("name_sort"),
								rset.getString("version"),
								rset.getString("start_time"),
								rset.getString("api"),
								rset.getInt("test_case"),
								rset.getInt("pass"),
								rset.getInt("fail"),
								rset.getInt("error"),
								rset.getString("duration")
								));
				cnt++;
			}
			System.out.println("result : " + cnt + " rows");
		} catch (Exception e) {
			System.out.println("## getTestResultDetail-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}
}