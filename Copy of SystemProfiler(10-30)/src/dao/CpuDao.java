package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
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
		String query = "select created from common where profile_id = ?";

		try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					//수정한 부분, io에서 그래프 그리기 위해 초단위 까지 가져오도록 수정함
					created = rset.getString(1).substring(5, 19);
					//아래는 원본 코드, created가 아니라 test_date로 컬럼 수정해서 할 경우 원래 코드로 복원하셔도 됩니다.
					//created = rset.getString(1).substring(5, 16);
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
		return created;
	}

	public String getCreatedFull(String id) {
		System.out.println("getCreatedFull-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String created = null;
		String query = "select created from common where profile_id = ?";

		try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					created = rset.getString(1).substring(0, 19);
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
		return created;
	}
	
	public void getFilterInfo(String id, ArrayList<String> commandArray,
			ArrayList<String> pidArray, ArrayList<String> cpuArray,
			ArrayList<String> symbolArray) {
		System.out.println("getFilterInfo-dao **");
		PreparedStatement psmt1 = null;
		PreparedStatement psmt2 = null;
		PreparedStatement psmt3 = null;
		PreparedStatement psmt4 = null;
		ResultSet rset = null;
		String queryCommand = "select distinct(c.command) from cpu_usage c where c.profile_id = ? order by 1";
		String queryPid = "select distinct(cast(c.pid as decimal)) from cpu_usage c where c.profile_id = ? order by 1";
		String queryCpu = "select distinct(c.cpu) from cpu_usage c where c.profile_id = ? order by 1";
		String querySymbol = "select distinct(c.symbol) from cpu_usage c where c.profile_id = ? order by 1";
		try {
			psmt1 = conn.prepareStatement(queryCommand);
			psmt1.setString(1, id);
			rset = psmt1.executeQuery();	
			while(rset.next()){
				commandArray.add(rset.getString(1));
			}
			
			psmt2 = conn.prepareStatement(queryPid);
			psmt2.setString(1, id);
			rset = psmt2.executeQuery();	
			while(rset.next()){
				pidArray.add(rset.getString(1));
			}
			
			psmt3 = conn.prepareStatement(queryCpu);
			psmt3.setString(1, id);
			rset = psmt3.executeQuery();	
			while(rset.next()){
				cpuArray.add(rset.getString(1));
			}
			
			psmt4 = conn.prepareStatement(querySymbol);
			psmt4.setString(1, id);
			rset = psmt4.executeQuery();	
			while(rset.next()){
				symbolArray.add(rset.getString(1));
			}
			
		} catch (Exception e) {
			System.out.println("## getCpuTable-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt1);
			JdbcTemplate.close(psmt2);
			JdbcTemplate.close(psmt3);
			JdbcTemplate.close(psmt4);
		}
		
		return;
	}
	
	public void getCpuTable(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select overhead, command, shared_object, symbol, cpu, pid, child, parent, src_line from cpu_usage where profile_id = ?";
		int cnt = 0;
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new CpuEntity(id, rset.getString(1), rset.getString(2), rset.getString(3), rset.getString(4), null, null, null, null, null, null);
					if (rset.getString(5) != null) {
						entity.setCpu(rset.getString(5));
					}
					if (rset.getString(6) != null) {
						entity.setPid(rset.getString(6));
					}
					if (rset.getString(7) != null) {
						entity.setChild(rset.getString(7));
					}
					if (rset.getString(8) != null) {
						entity.setParent(rset.getString(8));
					}
					if (rset.getString(9) != null) {
						String entitySrcLine = rset.getString(9);
						entity.setSrcLine(entitySrcLine);
						if(entitySrcLine.contains("/")){
							int index = entitySrcLine.lastIndexOf("/")+1;
							entity.setSrcLineSimple(entitySrcLine.substring(index));
						}else{
							entity.setSrcLineSimple(entitySrcLine);
						}
					}
					cpuTable.add(entity);
					cnt++;
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
//			try {
	//			String Tokenizer Start**
			
/*			StringTokenizer stOverhead = null;
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
					String entitySrcLine = stSrcLine.nextToken();
					entity.setSrcLine(entitySrcLine);
					if(entitySrcLine.contains("/")){
						int index = entitySrcLine.lastIndexOf("/")+1;
						entity.setSrcLineSimple(entitySrcLine.substring(index));
					}else{
						entity.setSrcLineSimple(entitySrcLine);
					}
				}
				cpuTable.add(entity);*/
//				System.out.println("****"+cnt+"****");
//				System.out.println(entity.getId() + " | " + entity.getOverhead() + " | " + entity.getCommand() + " | " + entity.getSharedObject() + " | " + entity.getSymbol() + " | " + entity.getCpu() + " | " + entity.getPid() + " | " +entity.getChild() + " | " + created);
	//			String Tokenizer End**
				
//			} catch (Exception e) {
//				System.out.println("## getCpuTable-dao-Tokenizer Error ##");
//			}
			System.out.println("cnt : " + cnt);
		return;
	}
	
	public void getCpuTable100(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTable100-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select overhead, command, shared_object, symbol, cpu, pid, child, parent, src_line from cpu_usage where profile_id = ? limit 100";
		int cnt = 0;
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new CpuEntity(id, rset.getString(1), rset.getString(2), rset.getString(3), rset.getString(4), null, null, null, null, null, null);
					if (rset.getString(5) != null) {
						entity.setCpu(rset.getString(5));
					}
					if (rset.getString(6) != null) {
						entity.setPid(rset.getString(6));
					}
					if (rset.getString(7) != null) {
						entity.setChild(rset.getString(7));
					}
					if (rset.getString(8) != null) {
						entity.setParent(rset.getString(8));
					}
					if (rset.getString(9) != null) {
						String entitySrcLine = rset.getString(9);
						entity.setSrcLine(entitySrcLine);
						if(entitySrcLine.contains("/")){
							int index = entitySrcLine.lastIndexOf("/")+1;
							entity.setSrcLineSimple(entitySrcLine.substring(index));
						}else{
							entity.setSrcLineSimple(entitySrcLine);
						}
					}
					cpuTable.add(entity);
					cnt++;
				}
			} catch (Exception e) {
				System.out.println("## getCpuTable100-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		System.out.println("cnt : " + cnt);
		return;
	}

	public void getCpuTableFiltered(ArrayList<CpuEntity> cpuTable, String id,
			String command, String pid, String cpu, String symbol) {
		System.out.println("getCpuTableFiltered-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select overhead, command, shared_object, symbol, cpu, pid, child, \"\", parent, src_line from cpu_usage where profile_id = ? ";

		if(!command.equals("") && !command.equals("null")){
			StringTokenizer stCommand = new StringTokenizer(command, ";");
			String commandCondition = "";
			while(stCommand.hasMoreElements()){
				commandCondition += "'" + stCommand.nextToken() + "',";
			}
			commandCondition = commandCondition.substring(0, commandCondition.length()-1);
			query += "and command in (" + commandCondition + ") ";
		}
		if(!pid.equals("") && !pid.equals("null")){
			StringTokenizer stPid = new StringTokenizer(pid, ";");
			String pidCondition = "";
			while(stPid.hasMoreElements()){
				pidCondition += "'" + stPid.nextToken() + "',";
			}
			pidCondition = pidCondition.substring(0, pidCondition.length()-1);
			query += "and pid in (" + pidCondition + ") ";
		}
		if(!cpu.equals("") && !cpu.equals("null")){
			StringTokenizer stCpu = new StringTokenizer(cpu, ";");
			String cpuCondition = "";
			while(stCpu.hasMoreElements()){
				cpuCondition += "'" + stCpu.nextToken() + "',";
			}
			cpuCondition = cpuCondition.substring(0, cpuCondition.length()-1);
			query += "and cpu in (" + cpuCondition + ") ";
		}
/*		if(!symbol.equals("")){
			StringTokenizer stSymbol = new StringTokenizer(symbol, ";");
			String symbolCondition = "";
			while(stSymbol.hasMoreElements()){
				symbolCondition += "'" + stSymbol.nextToken() + "',";
			}
			symbolCondition = symbolCondition.substring(0, symbolCondition.length()-1);
			query += "and symbol in (" + symbolCondition + ") ";
		}*/
		System.out.println(query);
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);		
				rset = psmt.executeQuery();
				
				while(rset.next()){
				entity = new CpuEntity(id, rset.getString(1),
						rset.getString(2), rset.getString(3),
						rset.getString(4), null,null,null,null,null,null);
				
				if(rset.getString(5) != null && !rset.getString(5).equals("")){
					entity.setCpu(rset.getString(5));
				}
				if(rset.getString(6) != null && !rset.getString(6).equals("")){
					entity.setPid(rset.getString(6));
				}
				if(rset.getString(7) != null && !rset.getString(7).equals("")){
					entity.setChild(rset.getString(7).replace(";;", ";-;"));
				}
				if(rset.getString(10) != null && !rset.getString(10).equals("")){
					entity.setSrcLine(rset.getString(10));
					if(rset.getString(10).contains("/")){
						int index = rset.getString(10).lastIndexOf("/")+1;
						entity.setSrcLineSimple(rset.getString(10).substring(index));
					}else{
						entity.setSrcLineSimple(rset.getString(10));
					}
				}
					
				cpuTable.add(entity);
				}
				
			} catch (Exception e) {
				System.out.println("## getCpuTableFiltered-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
			return;
	}

	public void getCpuTableGroupBy(ArrayList<CpuEntity> cpuTable, String id) {
		System.out.println("getCpuTableGroupBy-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select round(sum(c.overhead),2), c.command, count(c.overhead) from cpu_usage c where c.profile_id = ? group by c.command order by 1 desc";
		int cnt = 0;
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new CpuEntity();
					if (rset.getString(1) != null) {
						entity.setOverhead(rset.getString(1));
					}
					if (rset.getString(2) != null) {
						entity.setCommand(rset.getString(2));
					}
					if (rset.getString(3) != null) {
						entity.setCounts(rset.getString(3));
					}
					cpuTable.add(entity);
					cnt++;
				}
			} catch (Exception e) {
				System.out.println("## getCpuTableGroupBy-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		System.out.println("cnt : " + cnt);
		return;
	}
	
	public void getCpuTableSorted(ArrayList<CpuEntity> cpuTable, String id,
			String command, String pid, String cpu, String symbol,
			String condition) {
		System.out.println("getCpuTableSorted-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select overhead, command, shared_object, symbol, cpu, pid, child, created, parent, src_line from cpu_usage where profile_id = ? ";

		if(command != null && !command.equals("") && !command.equals("null")){
			StringTokenizer stCommand = new StringTokenizer(command, ";");
			String commandCondition = "";
			while(stCommand.hasMoreElements()){
				commandCondition += "'" + stCommand.nextToken() + "',";
			}
			commandCondition = commandCondition.substring(0, commandCondition.length()-1);
			query += "and command in (" + commandCondition + ") ";
		}
		if(pid != null && !pid.equals("") && !pid.equals("null")){
			StringTokenizer stPid = new StringTokenizer(pid, ";");
			String pidCondition = "";
			while(stPid.hasMoreElements()){
				pidCondition += "'" + stPid.nextToken() + "',";
			}
			pidCondition = pidCondition.substring(0, pidCondition.length()-1);
			query += "and pid in (" + pidCondition + ") ";
		}
		if(cpu != null && !cpu.equals("") && !cpu.equals("null")){
			StringTokenizer stCpu = new StringTokenizer(cpu, ";");
			String cpuCondition = "";
			while(stCpu.hasMoreElements()){
				cpuCondition += "'" + stCpu.nextToken() + "',";
			}
			cpuCondition = cpuCondition.substring(0, cpuCondition.length()-1);
			query += "and cpu in (" + cpuCondition + ") ";
		}
		if(symbol != null && !symbol.equals("") && !symbol.equals("null")){
			StringTokenizer stSymbol = new StringTokenizer(symbol, ";");
			String symbolCondition = "";
			while(stSymbol.hasMoreElements()){
				symbolCondition += "'" + stSymbol.nextToken() + "',";
			}
			symbolCondition = symbolCondition.substring(0, symbolCondition.length()-1);
			query += "and symbol in (" + symbolCondition + ") ";
		}
		if(condition != null && !condition.equals("") && !condition.equals("null")){
			String sortCondition = "";
			sortCondition += "order by " + condition;
			
			if(condition.equals("overhead")){
				sortCondition += " desc";
			}
			query += sortCondition;
		}
		System.out.println(query);
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);		
				rset = psmt.executeQuery();
				
				while(rset.next()){
				entity = new CpuEntity(id, rset.getString(1),
						rset.getString(2), rset.getString(3),
						rset.getString(4), null,null,null,null,null,null);
				
				if(rset.getString(5) != null && !rset.getString(5).equals("")){
					entity.setCpu(rset.getString(5));
				}
				if(rset.getString(6) != null && !rset.getString(6).equals("")){
					entity.setPid(rset.getString(6));
				}
				if(rset.getString(7) != null && !rset.getString(7).equals("")){
					entity.setChild(rset.getString(7).replace(";;", ";-;"));
				}
				if(rset.getString(10) != null && !rset.getString(10).equals("")){
					entity.setSrcLine(rset.getString(10));
					if(rset.getString(10).contains("/")){
						int index = rset.getString(10).lastIndexOf("/")+1;
						entity.setSrcLineSimple(rset.getString(10).substring(index));
					}else{
						entity.setSrcLineSimple(rset.getString(10));
					}
				}
					
				cpuTable.add(entity);
				}
				
			} catch (Exception e) {
				System.out.println("## getCpuTableFiltered-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
			return;
	}
	
	
	public void getCpuFunction(HashMap<String,String> functionMap, String id) {
		System.out.println("getCpuFunction-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select c.command, round(sum(c.overhead),2) from cpu_usage c where c.profile_id = ? and c.command in ('surface-manager','activitymanager','WebAppMgr','QtWebProcess','sam','ls-hubd') group by c.command order by 2 desc";
		int cnt = 0;
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					functionMap.put(rset.getString(1), rset.getString(2));
					cnt++;
				}
				System.out.println("cnt : " + cnt);
			} catch (Exception e) {
				System.out.println("## getCpuFunction-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		
		String[] command = {"surface-manager","activitymanager","WebAppMgr","QtWebProcess","sam","ls-hubd"};
		Set<String> keyset = functionMap.keySet();
		
		for(int inx = 0 ; inx < command.length ; inx++){
			if(!keyset.contains(command[inx])){
				functionMap.put(command[inx], "0");
			}
		}
		return;
	}
/*	public void getCpuFunction(ArrayList<CpuEntity> cpuFunction, String id) {
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
*/	
	

	public void getCpuProcessInfo(ArrayList<CpuEntity> cpuProcessInfo, String id) {
		System.out.println("getCpuProcessInfo-dao **");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		CpuEntity entity = null;
		String query = "select round(sum(c.overhead),2), c.command from cpu_usage c where c.profile_id = ? group by c.command order by 1 desc limit 25";
//		int cnt = 0;
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new CpuEntity();
					entity.setOverhead(rset.getString(1));
					entity.setCommand(rset.getString(2));
					cpuProcessInfo.add(entity);
//					cnt++;
				}
//				System.out.println("cnt : " + cnt);
			} catch (Exception e) {
				System.out.println("## getCpuFunction-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
		return;
	}
	
	public void getCpuCore(ArrayList<CpuEntity> cpuCore, String id) {
		System.out.println("getCpuFunction-dao **");
		CpuEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select overhead, cpu, command from cpu_usage where profile_id = ?";
		
			try {
				psmt = conn.prepareStatement(query);
				psmt.setString(1, id);
				rset = psmt.executeQuery();
				while(rset.next()){
					entity = new CpuEntity();
					entity.setOverhead(rset.getString(1));
					entity.setCpu(rset.getString(2));
					entity.setCommand(rset.getString(3));
					cpuCore.add(entity);
				}
			} catch (Exception e) {
				System.out.println("## getCpuCore-dao Error ##");
			} finally {
				JdbcTemplate.close(rset);		
				JdbcTemplate.close(psmt);
			}
			
//			try {
				//			String Tokenizer Start**
				
		/*	if(cpu != null){
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
			}*/
//					System.out.println(entity.getId() + " | " + entity.getOverhead() + " | " + entity.getCommand() + " | " + entity.getSharedObject() + " | " + entity.getSymbol() + " | " + entity.getCpu() + " | " + entity.getPid() + " | " +entity.getChild());
					
		//			String Tokenizer End**
//			} catch (Exception e) {
//				System.out.println("## getCpuFunction-dao-Tokenizer Error ##");
//			}
		return;
	}

	public void getCpuSearchResult(ArrayList<CpuSearchEntity> cpuSearchResult,String userId) {
		System.out.println("getCpuSearchResult-dao **");
		CpuSearchEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select profile_id,created,file_name,test_case_id,created,user_id from common where user_id like ? order by 1 desc";
		
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
		String query = "select file_name, test_case_id, created, user_id from common where profile_id = ?";
		
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
	
	public void getCpuSummaryTotal(CpuSummaryEntity cpuSummary, String id) {
		System.out.println("getCpuSummaryTotal-dao **");
		PreparedStatement psmt = null;
//		PreparedStatement psmt2 = null;
		ResultSet rset = null;
		String query = "select count(*), round(sum(c.overhead),1) from cpu_usage c where c.profile_id = ?";
//		String query2 = "select round(sum(c.overhead),1) from cpu_usage c where c.profile_id = ? and c.command = 'swapper'";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();
			while(rset.next()){
				cpuSummary.setNumberOfFuctions(rset.getString(1));
				cpuSummary.setTotalOverhead(rset.getString(2));
			}
//			psmt2 = conn.prepareStatement(query2);
//			psmt2.setString(1, id);
//			rset = psmt2.executeQuery();
//			while(rset.next()){
//				cpuSummary.setIdleOverhead(rset.getString(1));
//			}
//			cpuSummary.setUsageOverhead((String.valueOf((Double.parseDouble(cpuSummary.getTotalOverhead()) - Double.parseDouble(cpuSummary.getIdleOverhead())))).substring(0,4));
		} catch (Exception e) {
			System.out.println("## getCpuSearchResult-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
//			JdbcTemplate.close(psmt2);
		}
		return;
	}
	
	public int deleteSearchResult(String id) {
		System.out.println("deleteSearchResult-dao **");
		int result = 0;
		PreparedStatement psmt = null;
		PreparedStatement psmtCpu = null;
		PreparedStatement psmtMem = null;
		PreparedStatement psmtIo = null;
		String query = "delete from common where profile_id = ?";
		String queryCpu = "delete from cpu_usage where profile_id = ?";
		String queryMem = "delete from mem_usage where profile_id = ?";
		String queryIo = "delete from io_usage where profile_id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmtCpu = conn.prepareStatement(queryCpu);
			psmtMem = conn.prepareStatement(queryMem);
			psmtIo = conn.prepareStatement(queryIo);
			
			psmt.setString(1, id);
			psmtCpu.setString(1, id);
			psmtMem.setString(1, id);
			psmtIo.setString(1, id);
			
			result = psmt.executeUpdate();
			
			if(result == 1){
				System.out.println("delete ID : " + id);
				System.out.println("delete CPU Rows : " + psmtCpu.executeUpdate());
				System.out.println("delete MEM Rows : " + psmtMem.executeUpdate());
				System.out.println("delete IO Rows : " + psmtIo.executeUpdate());
			}
			
		} catch (Exception e) {
			System.out.println("## deleteBoard-dao Error ##");
		} finally {
			JdbcTemplate.close(psmt);
			JdbcTemplate.close(psmtCpu);
			JdbcTemplate.close(psmtMem);
			JdbcTemplate.close(psmtIo);
		}
		return result;
	}

}
