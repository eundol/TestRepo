package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.BoardDao;
import dao.CpuDao;
import entity.CpuEntity;
import entity.CpuSearchEntity;
import entity.CpuSummaryEntity;

public class CpuBiz {

	public String getCreated(String id) {
		System.out.println("getCreated-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		String created = dao.getCreated(id);
		JdbcTemplate.close(conn);
		return created;
	}
	
	public String getCpuTable(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		String created = dao.getCpuTable(cpuTable, id);
		JdbcTemplate.close(conn);
		return created;
	}

	public void getCpuFunction(ArrayList<CpuEntity> cpuFunction, String id) {
		System.out.println("getCpuFunction-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuFunction(cpuFunction, id);
		JdbcTemplate.close(conn);
		return;
	}

	public void getCpuCore(ArrayList<CpuEntity> cpuCore, String id) {
		System.out.println("getCpuCore-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuCore(cpuCore, id);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getCpuSearchResult(ArrayList<CpuSearchEntity> cpuSearchResult, String userId) {
		System.out.println("getCpuSearchResult-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuSearchResult(cpuSearchResult, userId);
		JdbcTemplate.close(conn);
		return;
	}

	public void getCpuSummary(CpuSummaryEntity cpuSummary, String id) {
		System.out.println("getCpuSummary-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuSummary(cpuSummary, id);
		JdbcTemplate.close(conn);
		return;
	}

	public boolean deleteSearchResult(String[] deleteCheckId) {
		System.out.println("deleteSearchResult-biz **");
		Connection conn = JdbcTemplate.getConnection();
		boolean flag = false;
		int cnt = 0;
		
		CpuDao dao = new CpuDao(conn);
		
		for(int i = 0 ; i < deleteCheckId.length ; i++){
			int result = dao.deleteSearchResult(deleteCheckId[i]);
			if(result == 1){
				cnt++;
			}
		}
		if(deleteCheckId.length == cnt){
			flag = true;
			JdbcTemplate.commit(conn);
			System.out.println(deleteCheckId.length + " rows.. delete success!");
		}else{
			JdbcTemplate.rollback(conn);
			System.out.println(deleteCheckId.length + " rows.. delete fail!");
		}
		
		JdbcTemplate.close(conn);
		return flag;
	}

}
