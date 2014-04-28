package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.StringTokenizer;

import common.JdbcTemplate;

import entity.CpuEntity;
import entity.CpuSearchEntity;
import entity.CpuSummaryEntity;

public class CpuDao {

	private Connection conn;
	
	public CpuDao(Connection conn) {
		this.conn = conn;
	}

	public String getCreated(String id) {
		System.out.println("getCreated-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String created = null;
		String query = "select created from cpu_usage where profile_id = ?";

		try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					created = rset.getString(1).substring(5, 16);
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
		return created;
	}
	
	public String getCpuTable(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String overhead = null;
		String command = null;
		String sharedObject = null;
		String symbol = null;
		String cpu = null;
		String pid = null;
		String child = null;
		String created = null;
		String parent = null;
		String srcLine = null;
		String query = "select overhead, command, shared_object, symbol, cpu, pid, child, created, parent, src_line from cpu_usage where profile_id = ?";

			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					overhead = rset.getString(1);
					command = rset.getString(2);
					sharedObject = rset.getString(3);
					symbol = rset.getString(4);
					cpu = rset.getString(5);
					pid = rset.getString(6);
					child = rset.getString(7).replace(";;", ";-;");
					created = rset.getString(8).substring(5, 16);
					parent = rset.getString(9);
					srcLine = rset.getString(10); 
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
//			try {
	//			String Tokenizer Start**
			
			StringTokenizer stOverhead = null;
			if (overhead != null && !overhead.equals("")) {
				stOverhead = new StringTokenizer(overhead, ";");
			}
			StringTokenizer stCommand = null;
			if (command != null && !command.equals("")) {
				stCommand = new StringTokenizer(command, ";");
			}
			StringTokenizer stSharedObject = null;
			if (sharedObject != null && !sharedObject.equals("")) {
				stSharedObject = new StringTokenizer(sharedObject, ";");
			}
			StringTokenizer stSymbol = null;
			if (symbol != null && !symbol.equals("")) {
				stSymbol = new StringTokenizer(symbol, ";");
			}
			StringTokenizer stCpu = null;
			if (cpu != null && !cpu.equals("")) {
				stCpu = new StringTokenizer(cpu, ";");
			}
			StringTokenizer stPid = null;
			if (pid != null && !pid.equals("")) {
				stPid = new StringTokenizer(pid, ";");
			}
			StringTokenizer stChild = null;
			if (child != null && !child.equals("")) {
				stChild = new StringTokenizer(child, ";");
			}
			StringTokenizer stParent = null;
			if (parent != null && !parent.equals("")) {
				stParent = new StringTokenizer(parent, ";");
			}
			StringTokenizer stSrcLine = null;
			if (srcLine != null && !srcLine.equals("")) {
				stSrcLine = new StringTokenizer(srcLine, ";");
			}
			int cnt = 0;
			while(stOverhead.hasMoreElements()){
				entity = new CpuEntity(id,stOverhead.nextToken(),null,null,null,null,null,null,null,null,null);
				if(stCommand != null){
					entity.setCommand(stCommand.nextToken());
				}
				if(stSharedObject != null){
					entity.setSharedObject(stSharedObject.nextToken());
				}
				if(stSymbol != null){
					entity.setSymbol(stSymbol.nextToken());
				}
				if(stCpu != null){
					entity.setCpu(stCpu.nextToken());
				}
				if(stPid != null){
					entity.setPid(stPid.nextToken());
				}
				if(stChild != null){
					entity.setChild(stChild.nextToken());
				}
				if(stParent != null){
					entity.setParent(stParent.nextToken());
				}
				if(stSrcLine != null){
					entity.setSrcLine(stSrcLine.nextToken());
				}
				
				cpuTable.add(entity);
				cnt++;
//				System.out.println("****"+cnt+"****");
//				System.out.println(entity.getId() + " | " + entity.getOverhead() + " | " + entity.getCommand() + " | " + entity.getSharedObject() + " | " + entity.getSymbol() + " | " + entity.getCpu() + " | " + entity.getPid() + " | " +entity.getChild() + " | " + created);
			}
				System.out.println("cnt : " + cnt);
	//			String Tokenizer End**
				
//			} catch (Exception e) {
//				System.out.println("## getCpuTable-dao-Tokenizer Error ##");
//			}
			
		return created;
	}

	public void getCpuFunction(ArrayList<CpuEntity> cpuFunction, String id) {
		System.out.println("getCpuFunction-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String overhead = null;
		String symbol = null;
		String query = "select overhead,symbol from cpu_usage where profile_id = ?";
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					overhead = rset.getString(1);
					symbol = rset.getString(2);
				}
			} catch (Exception e) {
				System.out.println("## getCpuFunction-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
//			try {
				//			String Tokenizer Start**
				
				StringTokenizer stOverhead = null;
				if (overhead != null) {
					stOverhead = new StringTokenizer(overhead, ";");
				}
				StringTokenizer stSymbol = null;
				if (symbol != null) {
					stSymbol = new StringTokenizer(symbol, ";");
				}
				
				int cnt = 0;
				while(stOverhead.hasMoreElements()){
					entity = new CpuEntity(id,stOverhead.nextToken(),null,null,stSymbol.nextToken(),null,null,null,null,null,null);
//					if(stChild != null){
//						entity.setChild(stChild.nextToken());
//					}
					cpuFunction.add(entity);
					cnt++;
//					System.out.println(entity.getId() + " | " + entity.getOverhead() + " | " + entity.getCommand() + " | " + entity.getSharedObject() + " | " + entity.getSymbol() + " | " + entity.getCpu() + " | " + entity.getPid() + " | " +entity.getChild());
					if(cnt == 7 ){
						break;
					}
				}
					System.out.println("cnt : " + cnt);
					
		//			String Tokenizer End**
//			} catch (Exception e) {
//				System.out.println("## getCpuFunction-dao-Tokenizer Error ##");
//			}
			
		return;
	}
	
	public void getCpuCore(ArrayList<CpuEntity> cpuCore, String id) {
		System.out.println("getCpuFunction-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String overhead = null;
		String cpu = null;
		String command = null;
		String query = "select overhead, cpu, command from cpu_usage where profile_id = ?";
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					overhead = rset.getString(1);
					cpu = rset.getString(2);
					command = rset.getString(3);
				}
			} catch (Exception e) {
				System.out.println("## getCpuCore-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
//			try {
				//			String Tokenizer Start**
				
			if(cpu != null){
				StringTokenizer stOverhead = null;
				if (overhead != null && !overhead.equals("")) {
					stOverhead = new StringTokenizer(overhead, ";");
				}
				StringTokenizer stCpu = null;
				if (cpu != null && !cpu.equals("")) {
					stCpu = new StringTokenizer(cpu, ";");
				}
				StringTokenizer stCommand = null;
				if (command != null && !command.equals("")) {
					stCommand = new StringTokenizer(command, ";");
				}
				
				while(stOverhead.hasMoreElements()){
					entity = new CpuEntity(id,stOverhead.nextToken(),stCommand.nextToken(),null,null,stCpu.nextToken(),null,null,null,null,null);
					cpuCore.add(entity);
			}
//					System.out.println(entity.getId() + " | " + entity.getOverhead() + " | " + entity.getCommand() + " | " + entity.getSharedObject() + " | " + entity.getSymbol() + " | " + entity.getCpu() + " | " + entity.getPid() + " | " +entity.getChild());
					
		//			String Tokenizer End**
//			} catch (Exception e) {
//				System.out.println("## getCpuFunction-dao-Tokenizer Error ##");
//			}
				}
				
		return;
	}

	public void getCpuSearchResult(ArrayList<CpuSearchEntity> cpuSearchResult,String userId) {
		System.out.println("getCpuSearchResult-dao **");
		CpuSearchEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select profile_id,created,file_name,test_case_id,test_date,user_id from cpu_usage where user_id like ? order by 1 desc";
		
		try {
			psmt = conn.prepareStatement(query);
			userId = "%" + userId + "%";
			psmt.setString(1, userId);
			rset = psmt.executeQuery();
			while(rset.next()){
				entity = new CpuSearchEntity(rset.getString(1),rset.getString(2).substring(5, 16),rset.getString(3),rset.getString(4),rset.getString(5),rset.getString(6));
				cpuSearchResult.add(entity);
			}
		} catch (Exception e) {
			System.out.println("## getCpuSearchResult-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getCpuSummary(CpuSummaryEntity cpuSummary, String id) {
		System.out.println("getCpuSummary-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select file_name, test_case_id, test_date, user_id from cpu_usage where profile_id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();
			while(rset.next()){
				cpuSummary.setFileName(rset.getString(1));
				cpuSummary.setTestCaseId(rset.getString(2));
				cpuSummary.setTestDate(rset.getString(3));
				cpuSummary.setUserId(rset.getString(4));
			}
		} catch (Exception e) {
			System.out.println("## getCpuSearchResult-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public int deleteSearchResult(String string) {
		System.out.println("deleteSearchResult-dao **");
		int result = 0;
		PreparedStatement psmt = null;
		String query = "delete from cpu_usage where profile_id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, string);
			result = psmt.executeUpdate();
		} catch (Exception e) {
			System.out.println("## deleteBoard-dao Error ##");
		} finally {
			JdbcTemplate.close(psmt);
		}
		return result;
	}

}
