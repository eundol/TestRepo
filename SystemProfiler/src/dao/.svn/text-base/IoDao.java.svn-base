package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.IoEntity;
import entity.IotopEntity;

/*
 * class name: IoDao
 * description: I/O 관련 Data를 DB로 부터 가져오는 작업을 처리하는 부분(dao)
 */
public class IoDao {
	private Connection conn;

	/*
	 * constructor name: IoDao
	 * description: IoDato 생성과 동시에 DB Connector 생성
	 */
	public IoDao(Connection conn) {
		this.conn = conn;
	}

	/*
	 * method name: getIoTable
	 * params:  ioTable, id, sequence
	 * description: iostat 결과 테이블을 DB로 부터 가져오는 작업
	 * query: 
	 * => select * from io_usage where profile_id = ?
	 * => select * from io_usage where profile_id = ? and sequence = ?
	 */
	public ArrayList<IoEntity> getIoTable(ArrayList<IoEntity> ioTable,
			String id, String sequence) {
		System.out.println("getIoTable-dao getIoTable start**");

		//필요한 변수 선언 및 초기화
		IoEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;

		String device = null;
		String tps = null;
		String read_s = null;
		String wrtn_s = null;
		String read = null;
		String wrtn = null;
		String query = null;

		//I/O정보 페이지에 처음 진입인지(sequence==0) 그래프에서 이벤트(sequence)를 가지고 온건지 확인하여 query 선정
		if (sequence.equals("0")) {
			query = "select * from io_usage where profile_id = ?";
		} else {
			query = "select * from io_usage where profile_id = ? and sequence = ?";
		}

		try {

			//sequence가 0인지 아닌지에 따라 query에 data 세팅
			psmt = conn.prepareStatement(query);

			if (sequence.equals("0")) {
				psmt.setString(1, id);
			} else {
				psmt.setString(1, id);
				psmt.setString(2, sequence);
			}

			//query 실행
			rset = psmt.executeQuery();

			//result set에 담긴 결과 data를 ioTable list에 저장
			while (rset.next()) {

				entity = new IoEntity(id, sequence, device, tps, read_s,
						wrtn_s, read, wrtn);

				if (sequence.equals("0")) {
					entity.setSequence(rset.getString(2));
				}

				device = rset.getString(3);
				if (device != null) {
					entity.setDevice(device);
				}

				tps = rset.getString(4);
				if (tps != null) {
					entity.setTps(tps);
				}

				read_s = rset.getString(5);
				if (read_s != null) {
					entity.setRead_s(read_s);
				}

				wrtn_s = rset.getString(6);
				if (wrtn_s != null) {
					entity.setWrtn_s(wrtn_s);
				}

				read = rset.getString(7);
				if (read != null) {
					entity.setRead(read);
				}

				wrtn = rset.getString(8);
				if (wrtn != null) {
					entity.setWrtn(wrtn);
				}

				ioTable.add(entity);
			}

		} catch (Exception e) {
			System.out.println("## getIoTable-dao Error getIoTable##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}

		return ioTable;
	}

	/*
	 * method name: getIoTableSequenceCnt
	 * params: none
	 * description: iostat 결과 테이블 중 sequence 종류 개수를 DB로 부터 가져오는 작업
	 * query: 
	 * => SELECT COUNT(DISTINCT sequence) FROM io_usage
	 */
	public int getIoTableSequenceCnt(String id) {
		System.out.println("getIoTable-dao getIoTableSequenceCnt start**");
		
		//필요한 변수 선언 및 초기화
		PreparedStatement psmt = null;
		ResultSet rset = null;
		int sequenceCnt = 0;

		//query 세팅
		String query = "SELECT COUNT(DISTINCT sequence) from io_usage where profile_id = ?";

		try {
			//쿼리 실행
			
			//sequence가 0인지 아닌지에 따라 query에 data 세팅
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			//result set에 담겨진 결과를 sequenceCnt에 저장
			while (rset.next()) {
				sequenceCnt = Integer.parseInt(rset.getString(1));
			}

		} catch (Exception e) {
			System.out
					.println("## getIoTable-dao Error getIoTableSequenceCnt##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}

		return sequenceCnt;
	}

	/*
	 * method name: getIoTableDeviceCnt
	 * params: none
	 * description: iostat 결과 테이블 중 device 종류 개수를 DB로 부터 가져오는 작업
	 * query: 
	 * => SELECT COUNT(DISTINCT device) FROM io_usage
	 */
	public int getIoTableDeviceCnt(String id) {
		System.out.println("getIoTable-dao getIoTableDeviceCnt start**");

		//필요한 변수 선언 및 초기화
		PreparedStatement psmt = null;
		ResultSet rset = null;
		int deviceCnt = 0;

		//query 세팅
		String query = "SELECT COUNT(DISTINCT device) from io_usage where profile_id = ?";

		try {
			//쿼리 실행
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			//result set에 담겨진 결과를 deviceCnt 저장
			while (rset.next()) {
				deviceCnt = Integer.parseInt(rset.getString(1));
			}

		} catch (Exception e) {
			System.out.println("## getIoTable-dao Error getIoTableDeviceCnt##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}

		return deviceCnt;
	}

	public void getCpuUsedFromIoStat(String id, IoEntity avgEntity) {
		System.out.println("getCpuUsedFromIoStat-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select round(AVG(i.user),2), round(AVG(i.nice),2), round(AVG(i.system),2), round(AVG(i.iowait),2), round(AVG(i.steal),2), round(AVG(i.idle),2) from io_usage i where profile_id = ? group by i.sequence and i.profile_id";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				avgEntity.setUser(rset.getString(1));
				avgEntity.setNice(rset.getString(2));
				avgEntity.setSystem(rset.getString(3));
				avgEntity.setIowait(rset.getString(4));
				avgEntity.setSteal(rset.getString(5));
				avgEntity.setIdle(rset.getString(6));
			}

		} catch (Exception e) {
			System.out.println("## getCpuUsedFromIoStat-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		
		return;
	}

	public void getCpuTraceFromIoStat(String id, ArrayList<IoEntity> cpuTraceInfo) {
		System.out.println("getCpuTraceFromIoStat-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select sequence, user, nice, system, iowait, steal, round(100-idle,2) from io_usage i where i.profile_id = ? group by i.sequence";
		IoEntity entity =  null;
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				entity = new IoEntity();
				entity.setSequence(rset.getString(1));
				entity.setUser(rset.getString(2));
				entity.setNice(rset.getString(3));
				entity.setSystem(rset.getString(4));
				entity.setIowait(rset.getString(5));
				entity.setSteal(rset.getString(6));
				entity.setUsed(rset.getString(7));
				cpuTraceInfo.add(entity);
			}
		} catch (Exception e) {
			System.out.println("## getCpuTraceFromIoStat-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getCpuMaxFromIoStat(String id, IoEntity maxEntity) {
		System.out.println("getCpuMaxFromIoStat-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select round(max(user),2), round(max(nice),2), round(max(system),2), round(max(iowait),2), round(max(steal),2), max(round(100-idle,2)) from io_usage i where i.profile_id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				maxEntity.setUser(rset.getString(1));
				maxEntity.setNice(rset.getString(2));
				maxEntity.setSystem(rset.getString(3));
				maxEntity.setIowait(rset.getString(4));
				maxEntity.setSteal(rset.getString(5));
				maxEntity.setUsed(rset.getString(6));
			}

		} catch (Exception e) {
			System.out.println("## getCpuMaxFromIoStat-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getIotopInformation(String id, ArrayList<IotopEntity> iotopInfo) {
		System.out.println("getIotopInformation-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select u.profile_id, u.sequence, u.pid, u.prio, u.user, u.read, u.write, u.swapin, u.io, u.command from iotop_usage u where u.profile_id = ?";
		IotopEntity entity = null;
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				entity = new IotopEntity(id, rset.getInt(2), rset.getInt(3), rset.getString(4),rset.getString(5),rset.getInt(6),rset.getInt(7),rset.getString(8),rset.getString(9),rset.getString(10));
				iotopInfo.add(entity);
//				entity.printContents();
			}

		} catch (Exception e) {
			System.out.println("## getIotopInformation-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getIotopCommandOrderByRead(String id, ArrayList<String> iotopCommandOrder) {
		System.out.println("getIotopCommandOrderByRead-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = 
				"select a1.profile_id, \"blank\", a2.read - a1.read, a1.command\n" +
						"from\n" + 
						"(select a.profile_id, a.sequence, sum(a.read) \"read\", a.command from iotop_usage a where a.profile_id = ? and a.sequence = (select min(u.sequence) from iotop_usage u where u.profile_id = ?) group by a.command) a1\n" + 
						"join\n" + 
						"(select a.profile_id, a.sequence, sum(a.read) \"read\", a.command from iotop_usage a where a.profile_id = ? and a.sequence = (select max(u.sequence) from iotop_usage u where u.profile_id = ?) group by a.command) a2\n" + 
						"on (a1.command = a2.command) order by 3 desc";

		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setString(2, id);
			psmt.setString(3, id);
			psmt.setString(4, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				iotopCommandOrder.add(rset.getString(4));
//				System.out.println(rset.getString(4));
			}

		} catch (Exception e) {
			System.out.println("## getIotopCommandOrderByRead-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getIotopCommandOrderByWrite(String id, ArrayList<String> iotopCommandOrder) {
		System.out.println("getIotopCommandOrderByWrite-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = 				
				"select a1.profile_id, \"blank\", a2.write - a1.write, a1.command\n" +
				"from\n" + 
				"(select a.profile_id, a.sequence, sum(a.write) \"write\", a.command from iotop_usage a where a.profile_id = ? and a.sequence = (select min(u.sequence) from iotop_usage u where u.profile_id = ?) group by a.command) a1\n" + 
				"join\n" + 
				"(select a.profile_id, a.sequence, sum(a.write) \"write\", a.command from iotop_usage a where a.profile_id = ? and a.sequence = (select max(u.sequence) from iotop_usage u where u.profile_id = ?) group by a.command) a2\n" + 
				"on (a1.command = a2.command) order by 3 desc";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setString(2, id);
			psmt.setString(3, id);
			psmt.setString(4, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				iotopCommandOrder.add(rset.getString(4));
//				System.out.println(rset.getString(4));
			}

		} catch (Exception e) {
			System.out.println("## getIotopCommandOrderByWrite-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getIotopHighreadInformation(String id,ArrayList<IotopEntity> iotopInfo) {
		System.out.println("getIotopHighreadInformation-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "select a.profile_id, a.sequence, sum(a.read), a.command from iotop_usage a where a.profile_id = ? and a.sequence = (select max(u.sequence) from iotop_usage u where u.profile_id = ?) group by a.command order by 3 desc limit 5";
		IotopEntity entity = null;
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setString(2, id);
			rset = psmt.executeQuery();

			while (rset.next()) {
				entity = new IotopEntity();
				entity.setCommand(rset.getString(4));
				entity.setSequence(rset.getInt(2));
				entity.setRead(rset.getInt(3));
				iotopInfo.add(entity);
//				System.out.println(rset.getString(4));
			}

		} catch (Exception e) {
			System.out.println("## getIotopCommandOrderByRead-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}
}