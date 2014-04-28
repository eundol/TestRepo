package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.IoEntity;

/*
 * class name: IoDao
 * description: I/O ���� Data�� DB�� ���� �������� �۾��� ó���ϴ� �κ�(dao)
 */
public class IoDao {
	private Connection conn;

	/*
	 * constructor name: IoDao
	 * description: IoDato ������ ���ÿ� DB Connector ����
	 */
	public IoDao(Connection conn) {
		this.conn = conn;
	}

	/*
	 * method name: getIoTable
	 * params:  ioTable, id, sequence
	 * description: iostat ��� ���̺��� DB�� ���� �������� �۾�
	 * query: 
	 * => select * from io_usage where profile_id = ?
	 * => select * from io_usage where profile_id = ? and sequence = ?
	 */
	public ArrayList<IoEntity> getIoTable(ArrayList<IoEntity> ioTable,
			String id, String sequence) {
		System.out.println("getIoTable-dao getIoTable start**");

		//�ʿ��� ���� ���� �� �ʱ�ȭ
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

		//I/O���� �������� ó�� ��������(sequence==0) �׷������� �̺�Ʈ(sequence)�� ������ �°��� Ȯ���Ͽ� query ����
		if (sequence.equals("0")) {
			query = "select * from io_usage where profile_id = ?";
		} else {
			query = "select * from io_usage where profile_id = ? and sequence = ?";
		}

		try {

			//sequence�� 0���� �ƴ����� ���� query�� data ����
			psmt = conn.prepareStatement(query);

			if (sequence.equals("0")) {
				psmt.setString(1, id);
			} else {
				psmt.setString(1, id);
				psmt.setString(2, sequence);
			}

			//query ����
			rset = psmt.executeQuery();

			//result set�� ��� ��� data�� ioTable list�� ����
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
	 * description: iostat ��� ���̺� �� sequence ���� ������ DB�� ���� �������� �۾�
	 * query: 
	 * => SELECT COUNT(DISTINCT sequence) FROM io_usage
	 */
	public int getIoTableSequenceCnt(String id) {
		System.out.println("getIoTable-dao getIoTableSequenceCnt start**");
		
		//�ʿ��� ���� ���� �� �ʱ�ȭ
		PreparedStatement psmt = null;
		ResultSet rset = null;
		int sequenceCnt = 0;

		//query ����
		String query = "SELECT COUNT(DISTINCT sequence) from io_usage where profile_id = ?";

		try {
			//���� ����
			
			//sequence�� 0���� �ƴ����� ���� query�� data ����
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			//result set�� ����� ����� sequenceCnt�� ����
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
	 * description: iostat ��� ���̺� �� device ���� ������ DB�� ���� �������� �۾�
	 * query: 
	 * => SELECT COUNT(DISTINCT device) FROM io_usage
	 */
	public int getIoTableDeviceCnt(String id) {
		System.out.println("getIoTable-dao getIoTableDeviceCnt start**");

		//�ʿ��� ���� ���� �� �ʱ�ȭ
		PreparedStatement psmt = null;
		ResultSet rset = null;
		int deviceCnt = 0;

		//query ����
		String query = "SELECT COUNT(DISTINCT device) from io_usage where profile_id = ?";

		try {
			//���� ����
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();

			//result set�� ����� ����� deviceCnt ����
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
}