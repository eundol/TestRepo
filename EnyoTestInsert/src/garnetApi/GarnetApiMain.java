package garnetApi;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcTemplateGarnet;
import common.Utils;

public class GarnetApiMain {

	public static void main(String[] args) throws FileNotFoundException {

//		String path = "C:/Users/heesung.eun/Desktop/garnet/bootplate-garnet(parsing)/lib/garnet";
		String path = args[0];
		File file = new File(path + "/source");
		System.out.println("================================ Information ================================");
		System.out.println("PATH : " + path);
		Utils.printWhetherFileOrDirectory(file);
		System.out.println("=============================================================================");
		
		ArrayList<GarnetApi> garnetApiList = new ArrayList<GarnetApi>();
		ArrayList<GarnetApiInfo> garnetApiInfoList = new ArrayList<GarnetApiInfo>();
		if(file.isDirectory()){
			
			// Get version
			GarnetApi.version = new GarnetGetVersion(path).garnetVersion;
			
			// Get garnetApiFileList - 유효한 API 파일들을 필터
			ArrayList<File> garnetApiFileList = new GarnetGetApiList().getApiFileList(file);
			System.out.println("Get garnetApiFileList... Done... garnetApiFileList.size() : " + garnetApiFileList.size());
//			Utils.printFileNameList(garnetApiFileList);
			
			// 유효한 파일이 없으면 종료
			if(garnetApiFileList.isEmpty()){
				System.out.println("garnetApiFileList is empty");
				return;
			}
			
			// Get garnetApiList - Published에 해당하는 API들을 이름과 파일로 짝지어 정리
				garnetApiList = new GarnetGetApiList().getApiList(garnetApiFileList);
				System.out.println("Get garnetApiList... Done... garnetApiList.size() : " + garnetApiList.size());
			
			// Published API가 없으면 종료
			if (garnetApiList.isEmpty()) {
				System.out.println("garnetApiList is empty");
				return;
			}
			
			// Get GarnetApiInfoList - API 정보를 담은 GarnetApiInfo 완성
			garnetApiInfoList = new GarnetGetApiList().getApiInfoList(garnetApiList);
			
			// test print - API 정보를 출력
			System.out.print("\n================================= API  INFO =================================");
			for (int i = 0; i < garnetApiInfoList.size(); i++) {
				System.out.println();
				System.out.println("#" +  (i+1) + " " + garnetApiInfoList.get(i).getName());
				Utils.printGarnetApiInfo(garnetApiInfoList.get(i));
			}
			System.out.println("=============================================================================");
			System.out.println("Get garnetApiInfoList... Done...");
			
			// API Info 리스트가 없으면 종료
			if (garnetApiInfoList.isEmpty()) {
				System.out.println("## garnetApiInfoList is empty");
				return;
			}
			
			// insert version Data
			int result = 0;
			Connection conn = JdbcTemplateGarnet.getConnection();
			PreparedStatement psmt = null;
			try {
				psmt = conn.prepareStatement(Queries.insertVersion);
				psmt.setString(1, GarnetApi.version);
				result = psmt.executeUpdate();
			} catch (SQLException e) {
				rollback(conn, psmt);
				e.printStackTrace();
			}
			if(result != 1){
				System.out.println("## version is invalid or already exist");
				rollback(conn, psmt);
				return;
			}
			
			// get version Id
			int versionId = 0;
			ResultSet rset;
			try {
				psmt = conn.prepareStatement(Queries.getVersionId);
				psmt.setString(1, GarnetApi.version);
				rset = psmt.executeQuery();
				while(rset.next()){
					versionId = rset.getInt("version_id");
				}
			} catch (SQLException e) {
				rollback(conn, psmt);
				e.printStackTrace();
			}
			System.out.println("version ID : " + versionId);
			//insert API Info
			result = 0;
			System.out.print("app ID : ");
			try {
				for (int i = 0 ; i < garnetApiInfoList.size(); i++) {
					GarnetApiInfo apiInfo = garnetApiInfoList.get(i);
					psmt = conn.prepareStatement(Queries.insertApiInfo);
					psmt.setInt(1, versionId);
					psmt.setString(2, apiInfo.getName());
					psmt.setString(3, apiInfo.getKind());
					psmt.setString(4, apiInfo.getDescription());
					result += psmt.executeUpdate();
					// get API ID
					int apiId = 0;
					psmt = conn.prepareStatement(Queries.getApiId);
					psmt.setInt(1, versionId);
					psmt.setString(2, apiInfo.getName());
					rset = psmt.executeQuery();
					while(rset.next()){
						apiId = rset.getInt("api_id");
					}
					System.out.print(apiId + ", ");
					ArrayList<Options> apiInfoPublics = apiInfo.getPublics();
					for(int j = 0 ; j < apiInfoPublics.size() ; j++){
						psmt = conn.prepareStatement(Queries.insertApiInfoPublic);
						psmt.setInt(1, apiId);
						psmt.setString(2, apiInfoPublics.get(j).getOptionName());
						psmt.setString(3, apiInfoPublics.get(j).getType());
						psmt.setString(4, apiInfoPublics.get(j).getDefaultValue());
						psmt.setString(5, apiInfoPublics.get(j).getDescription());
						psmt.executeUpdate();
					}
				}
			} catch (SQLException e) {
				rollback(conn, psmt);
				e.printStackTrace();
			}
			System.out.println();
			if(result != garnetApiInfoList.size()){
				System.out.println("## All apiInfo were not inserted.. will be rollback");
				rollback(conn, psmt);
				return;
			}
			
			JdbcTemplateGarnet.commit(conn);
			JdbcTemplateGarnet.close(psmt);
			JdbcTemplateGarnet.close(conn);
			
			System.out.println(path + "  ***** API INSERT TO DB HAS BE DONE ^^");
			
		}else{
			System.out.println("## is not Directory");
			return;
		}
	}

	public static void rollback(Connection conn, PreparedStatement psmt) {
		JdbcTemplateGarnet.rollback(conn);
		JdbcTemplateGarnet.close(psmt);
		JdbcTemplateGarnet.close(conn);
	}
	
}
