package biz;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;

import common.JdbcTemplate;

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
	
	public String getCreatedFull(String id) {
		System.out.println("getCreated-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		String created = dao.getCreatedFull(id);
		JdbcTemplate.close(conn);
		return created;
	}
	
	public void getFilterInfo(String id, ArrayList<String> commandArray,
		ArrayList<String> pidArray, ArrayList<String> cpuArray,
		ArrayList<String> symbolArray) {
		System.out.println("getFilterInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getFilterInfo(id, commandArray, pidArray, cpuArray, symbolArray);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getCpuTable(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuTable(cpuTable, id);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getCpuTable1000(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable1000-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuTable1000(cpuTable, id);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getCpuTableFiltered(ArrayList<CpuEntity> cpuTable, String id, String command, String pid, String cpu, String symbol) {
		System.out.println("getCpuTableFiltered-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuTableFiltered(cpuTable, id, command, pid, cpu, symbol);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getCpuTableSorted(ArrayList<CpuEntity> cpuTable, String id,
			String command, String pid, String cpu, String symbol, String condition) {
		System.out.println("getCpuTableSorted-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuTableSorted(cpuTable, id, command, pid, cpu, symbol, condition);
		JdbcTemplate.close(conn);
		return;
	}
	

	public void getCpuFunction(HashMap<String,String> functionMap, String id) {
		System.out.println("getCpuFunction-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuFunction(functionMap, id);
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
	

	public void getCpuSummaryTotal(CpuSummaryEntity cpuSummary, String id) {
		System.out.println("getCpuSummaryTotal-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CpuDao dao = new CpuDao(conn);
		dao.getCpuSummaryTotal(cpuSummary, id);
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
			System.out.println(deleteCheckId.length + " Common rows.. delete success!");
		}else{
			JdbcTemplate.rollback(conn);
			System.out.println(deleteCheckId.length + " Common rows.. delete fail!");
		}
		
		JdbcTemplate.close(conn);
		return flag;
	}
}
