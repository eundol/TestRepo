package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.CommonDao;
import dao.CpuDao;
import entity.CpuEntity;
import entity.CpuSearchEntity;

public class CommonBiz {

	public CpuSearchEntity getObjectInfo(String id) {
		System.out.println("getObjectInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		CommonDao dao = new CommonDao(conn);
		CpuSearchEntity cpuSearch = dao.getObjectInfo(id);
		JdbcTemplate.close(conn);
		return cpuSearch;
	}

	
}
