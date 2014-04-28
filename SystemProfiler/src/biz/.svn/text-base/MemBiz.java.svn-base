package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.MemDao;
import entity.MemEntity;
import entity.SmemEntity;

public class MemBiz {
	
	public void getMemoryInfo(String id, ArrayList<MemEntity> memoryInfo) {
		System.out.println("getMemoryInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		MemDao dao = new MemDao(conn);
		dao.getMemoryInfo(id, memoryInfo);
		JdbcTemplate.close(conn);
		return;
	}

	public void getSequenceMemoryInfo(String id, String sequence,
			MemEntity sequenceInfo) {
		System.out.println("getSequenceMemoryInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		MemDao dao = new MemDao(conn);
		dao.getSequenceMemoryInfo(id, sequence, sequenceInfo);
		JdbcTemplate.close(conn);
		return;
	}

	public void getSmemInfo(String id, String sortParam, String order, ArrayList<SmemEntity> smemInfo, String option) {
		System.out.println("getSmemInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		MemDao dao = new MemDao(conn);
		dao.getSmemInfo(id, sortParam, order, smemInfo, option);
		JdbcTemplate.close(conn);
		return;
	}
	
}
