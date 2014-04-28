import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;



public class DBTest {

	
	Connection con1 = null;
	Connection con2=  null;
	Statement stmt1 = null;
	Statement stmt2 = null;
	
	ResultSet rs = null;
	
	String sqlQuery = null;
	String table_name = null;
	int table_check = 1;
	
	File f = null;
	FileWriter fw = null;
	BufferedWriter bw = null;
	
	//constructor
	public DBTest(){
		
	}
	
	
	public static void main(String[] args){
		
		int i =1;
		DBTest test = new DBTest();
		
		test.getResultsetFromSql();
		while(i<=3){
			if(i==1)
				test.sqlQueryEnter(1);
			else if(i==2)
				test.sqlQueryEnter(2);
			else if(i==3)
				test.sqlQueryEnter(3);
			else
				;
			
			test.executeQuery();
			test.processResultSet();	// file generation + write data + insert data
			
			i++;
		}
		
		test.writeLog();
		test.DBMSdisconnect();
		System.out.println("............................Program Terminate :D");
		
	}
	
	public void writeLog()
	{
		File f_out = null;
		FileWriter fw_out = null;
		BufferedWriter bw_out = null;

		f_out = new File("/DBGetLog/DBTest.log");
		try {
			fw_out = new FileWriter(f_out);
			fw_out.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : file writer error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}

		bw_out = new BufferedWriter(fw_out);

		long time = System.currentTimeMillis(); 
		SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
		String time_str = dayTime.format(new Date(time));

		try {
			bw_out.write(time_str);
			bw_out.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block

			System.out.println("ERROR : DBlog write error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}	
				

	}
	
	
	// Query execution function
	public void executeQuery()
	{
		try {
			rs = stmt1.executeQuery(sqlQuery);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : execute Query error... T.T");
			DBMSdisconnect();
			e.printStackTrace();
			System.exit(1);
		} // sql connection
		System.out.println("######### executeQuery success! #########");

	}

	// temporary file write + get the ResultSet data + attribute read + data write + insert data into DB
	public void processResultSet()
	{
		////////////////////////////////////////////////////////////////
		// file Generation
	//	String file_name = "data_.rtf";		// windows

	//	f = new File("C:\\"+file_name);		// windows
		f = new File("/DBGetLog/RawData.dat");			// linux
		
		try {
			fw = new FileWriter(f);
			fw.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : FileWriter error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
		
		bw = new BufferedWriter(fw);
		
		
		/////////////////////////////////////////////////////////////////
		// get the ResultSet Data 
		LinkedHashMap<String, String> rowDetails = new LinkedHashMap<String, String>();
		LinkedHashMap<String, LinkedHashMap<String, String>> resultMap = new LinkedHashMap<String, LinkedHashMap<String, String>>();
		
		ResultSetMetaData rsm = null;
		int col_count = 0;
		
		//int chk_ = 1;
		if(rs!=null){
		
			try {
				rsm = (ResultSetMetaData) rs.getMetaData();
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				System.out.println("rs.getMetaData() error...");
				e1.printStackTrace();
				DBMSdisconnect();
				System.exit(1);
			}
			
			try {
				int rowCount = 1;	
				col_count = rsm.getColumnCount();
				
				while(rs.next()){
					
					for(int i=1; i<=col_count; i++)
						rowDetails.put(rsm.getColumnName(i), rs.getString(i));
						
////					System.out.print(" chk : "+chk_);
//					chk_++;
					resultMap.put(new Integer(rowCount).toString(), rowDetails);
					rowCount ++;
					rowDetails = new LinkedHashMap<String, String>();
					
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("ERROR : rsm.getColumnCount() error... T.T");
				e.printStackTrace();
				DBMSdisconnect();
				System.exit(1);
			}
			
		}

		/////////////////////////////////////////////////////////////////////
		// attribute read
		Map<String, String> columnDetails = resultMap.get("1");
		Set<String> s = columnDetails.keySet();
		
		
		String attribute = null;
		String temp_attribute = null;
		for(String s1 : s){
			
			if(attribute == null)
				attribute = s1 + " ";
				
			else 
				attribute = temp_attribute + " " + s1;
				
			temp_attribute = attribute;
		}
		

		
		//////////////////////////////////////////////////////
		// data write
		System.out.println("#########  write to RawData.txt #########");
		System.out.println("CHECK - resultMap.size : "+resultMap.size());
		int chk = 1;
		
		for(int i=1 ; i<=resultMap.size(); i++){		// '<' -> '<='
			
			columnDetails = resultMap.get(new Integer(i).toString());
			String data_string = null;
			String data_temp_string = null;
			
			int j =1;

			int flag = 0;
			
			data_temp_string = "(";
			for(String s2:s){ 
				
				String temp_str = columnDetails.get(s2);	// null->

				if(temp_str==null){
				
					if(flag ==1){
					//	System.out.print("null check!  ");
						temp_str = "NULL";
			
						if(j==col_count)
							data_string = data_temp_string + " " +temp_str+ " ";
						else
							data_string = data_temp_string + " " +temp_str+ ", ";
						
						j++;	
						data_temp_string = data_string;
						
				//		continue;
					}
					
					else {	// 1st 문장에 NULL 이 있을 때
						temp_str = "NULL";
						data_string = "( "+ temp_str+ ", ";
						
						j++;
						data_temp_string = data_string;
					}	
					
					flag = 1;
					continue;
				}
				
				else{
					// for data format in sql (converting special character) 

					temp_str = temp_str.replace("\\", "\\\\");
					temp_str = temp_str.replace("\r", "\\r");
					temp_str = temp_str.replace("\\n", "\\\\n"); // <-------------------
					temp_str = temp_str.replace("\n", "\\n");	 // <-------------------
					temp_str = temp_str.replace("'", "\\'");
					
					
					if(j==col_count)
						data_string = data_temp_string + " " +"'"+temp_str+"'";
				
					else
						data_string = data_temp_string + " " +"'"+temp_str+"', ";
				
				
					data_temp_string = data_string;
					flag = 1;
					j++;
				}
			}
		
			data_string = data_temp_string + ")";
			
			
			try {
				bw.write(data_string+"\n");
				bw.flush();
				////////////////////////////////////////////////
				//System.out.print("  check : " + chk);
				chk ++;
				////////////////////////////////////////////////
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("ERROR : data_string write error... T.T");
				e.printStackTrace();
				DBMSdisconnect();
				System.exit(1);
			}	
		}
		
		System.out.println("######### Write to RawData.txt SUCCESS! #########");
		///////////////////////////////////////////////////////////////////
		// insert data
		
		// BEFORE INSERTION (1)
		FileReader fr = null;
		try {
			fr = new FileReader(f);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : file reader error... T.T");
			e1.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
		BufferedReader br = new BufferedReader(fr);
		
		
		// BEFORE INSERTION (2)
/*		getDBConnection(2); // return con
		try {
			stmt2 = con2.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("error... : createStatement2 error T.T");
			DBMSdisconnect();
			System.exit(1);
		}
		
	*/	

		// BEFORE INSERTION (3) : TRUNCATE
		try {
			stmt2.executeUpdate("TRUNCATE TABLE "+table_name);
		} catch (SQLException e2) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : TRUNCATE TABLE error... T.T");
			e2.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
			
		// INSERTION
		String insertString = "INSERT INTO " + table_name + " VALUES ";
		int flag = 1;
		int cnt = 1;
		System.out.println("######### DO INSERTION! #########");
		
		for(int i=1; i<=resultMap.size(); i++){	// '<' -> '<='
		
			String str = null;
			try {
				str = br.readLine();
				if(i==1)
					System.out.println("CHECK - 1st string \n"+str+"\n======================================================================================================");
			//	if(i==resultMap.size())
			//		System.out.println("CHECK - last string\n"+str+"\n==================================");
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				System.out.println("ERROR : br.readLine error... T.T");
				e1.printStackTrace();
				DBMSdisconnect();
				System.exit(1);

			}
		
			
			try {
				stmt2.executeUpdate(insertString+str);
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("ERROR : executeUpdate error... T.T");
				e.printStackTrace();
				DBMSdisconnect();
				System.exit(1);
			}

			// express the percentage of progress
//			int percent = (i/resultMap.size())*100;
	
			
				
			// int cnt =1;
			// String percent_str = null;
//			if(percent/cnt!=0 && percent%cnt == 0){
//				System.out.print(percent+"[%] ");
//				cnt ++;
//			}
			
			
			

			if(i==resultMap.size())
				System.out.println("\nCHECK - last string\n"+str+"\n======================================================================================================");
				
			
			
		}
		
		System.out.println("######### executeUpdate SUCCESS! #########");
		return ;
		
	}
	
	public void getResultsetFromSql()
	{
		// DB Connection function call
		
		getDBConnection(2);
		try {
			stmt2 = con2.createStatement();
		//	System.out.println("#########stmt2 connection success!!#########");
						
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("ERROR : stmt2 create error... T.T");

			DBMSdisconnect();
			System.exit(1);
		}
		
		getDBConnection(1); // return con

		try {
			stmt1 = con1.createStatement();
//			rs = stmt1.executeQuery(sqlQuery); // sql connection
//			System.out.println("#########executeQuery success!!#########");
						
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("ERROR : execute Query error... T.T");
			DBMSdisconnect(); 
			System.exit(1);
				}

		return;

	}
	
	public void sqlQueryEnter(int n)
	{
		if(n==1){
			sqlQuery = "select * from changes;";
			table_name = "changes";
			System.out.println("....................TABLE <changes>.....................");
		}
		else if(n==2){
			sqlQuery = "select * from change_messages;";
			table_name = "change_messages";
			System.out.println(".................TABLE <change_messages>................");
		}
		else if(n==3){
			sqlQuery = "select * from accounts;";
			table_name = "accounts";
			System.out.println("....................TABLE <accounts>....................");
		}
		
		return;
		
		
	}
	
	// DBMS Connection
	public void getDBConnection(int n) {

		if(n==1){
		
			/*
			String URL = "jdbc:mysql://10.177.234.48:3306/gerrit_infra_test";
			String user = "heesung";
			String passwd = "multisqe";
			*/
			
			String URL = "jdbc:mysql://binary.lge.com:3306/gerrit_swp";
			String user = "swp_select_only";
			String passwd = "lge123";
			
			try {
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				System.err.println("Class Not Found : " + e.getMessage());
				System.exit(1);
			}

			try {
				con1 = DriverManager.getConnection(URL, user, passwd);
				System.out.println("Successfully connected to DBMS! - connection 1");
			} catch (SQLException e) {
				System.err.println("SQL Error : " + e.getMessage());
				System.exit(1);
			}
		}
		
		else if(n==2){
			DBMSdisconnect();
		/*	
			String URL = "jdbc:mysql://127.0.0.1:3306/test";
			String user = "root";
			String passwd = "khcysy0113";
	*/
			String URL = "jdbc:mysql://10.177.234.48:3306/gerrit_infra_test";
			String user = "heesung";
			String passwd = "multisqe";
	
	
			try {
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				System.err.println("Class Not Found : " + e.getMessage());
				DBMSdisconnect();
				System.exit(1);
			}

			try {
				con2 = DriverManager.getConnection(URL, user, passwd);
				System.out.println("Successfully connected to DBMS! - connection 2");
			} catch (SQLException e) {
				System.err.println("SQL Error : " + e.getMessage());
			  	DBMSdisconnect();	
				System.exit(1);
			}
			
		
		}
			
		else
			;

		return;
	}

	
	public void DBMSdisconnect()
	{
		// Remote Server (Central DB Server)
		try {
			if (stmt1 != null) {
				stmt1.close();
				System.out.println("Successfully Dissconnect Statement - 1! :D");
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : Statement-1 Close error... T.T");
			e1.printStackTrace();
			System.exit(1);
		}

		try {
			if (con1 != null) {
				con1.close();
				System.out.println("Successfully Disconnect Connection - 1! :D");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : Connection-1 Close error... T.T");
			e.printStackTrace();
			System.exit(1);
		}
		
	
		/////////////////////////////////////////////////////////////
		// local PC or lab DB Server
		try {
			if (stmt2 != null) {
				stmt2.close();
				System.out.println("Successfully Dissconnect Statement - 2! :D");
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : Statement-2 Close error... T.T");
			e1.printStackTrace();
			System.exit(1);
		}

		try {
			if (con2 != null) {
				con2.close();
				System.out.println("Successfully Disconnect Connection - 2! :D");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : Connection-2 Close error... T.T");
			e.printStackTrace();
			System.exit(1);
		}
		
	}

		
	
	
	
}

