package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.EnyoDao;
import dataEntity.TestResultEntity;

public class EnyoBiz {

	public void getTestResultList(ArrayList<TestResultEntity> testResultList, String date) {
		Connection conn = JdbcTemplate.getConnection();
		new EnyoDao().getTestResultList(conn, testResultList, date);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getTestResultDetail(ArrayList<TestResultEntity> testResultList, String date, String component) {
		Connection conn = JdbcTemplate.getConnection();
		new EnyoDao().getTestResultDetail(conn, testResultList, date, component);
		JdbcTemplate.close(conn);
		return;
	}
}