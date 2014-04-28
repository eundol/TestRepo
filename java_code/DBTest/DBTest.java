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

	// global variables 
        Connection con1 = null;
        Connection con2=  null;
        Statement stmt1 = null;
        Statement stmt2 = null;

        ResultSet rs = null;

        String sqlQuery = null;
        String tableName = null;

	int table1Flag = 1;		// table1 check flag (for executing weekUpdate - insert "NULL" into last column)

	// RawDataSet.dat file  
        File f = null;
        FileWriter fw = null;
        BufferedWriter bw = null;
	final String dataFile = "/DBGetLog/RawDataSet.dat";	// path + fileName

        // log file
        File f_log = null;
        FileWriter fw_log = null;
        BufferedWriter bw_log = null;
	final String logFile = "/DBGetLog/DBTest.log";		// path  + fileName

        //constructor
        public DBTest(){

        }


        public static void main(String[] args){

                DBTest test = new DBTest();

                test.makeLog();			// make log file
                test.getResultSet();		// DBConnection + get ResultSet
		 
		for(int i=1;i<=6;i++){

                        if(i==1)
                                test.sqlQueryInitialize(1);	// Initialize sqlQuery and tableName
                        else if(i==2)
                                test.sqlQueryInitialize(2);
                        else if(i==3)
                                test.sqlQueryInitialize(3);
                        else if(i==4)
                        	test.sqlQueryInitialize(4);
                        else if(i==5)
                        	test.sqlQueryInitialize(5);
                        else if(i==6)
                        	test.sqlQueryInitialize(6);
                        else
                                ;

                        test.executeQuery();			// function call : executeQuery()
                        test.processResultSet();       		// Data formatting(from Center to Lab) + insert data into DB (using query : LOAD DATA INFILE)

			if(i==1)
				test.weekUpdate();		// week column Update
               }

                test.writeLog("............................Program Terminate :D");
                test.DBMSdisconnect();

                return;
        }


	/* ****** Make Log File ****** */
        public void makeLog()
        {
        	//f_log = new File("C:\\DBlog.txt");
		//String logFile = "/DBGetLog/DBTest.log";
		f_log = new File(logFile);	// linux
            
           	 try {
                 	fw_log = new FileWriter(f_log);
                    	fw_log.flush();
            	 } catch (IOException e) {
                    	System.out.println("ERROR : file writer error... T.T");
                    	e.printStackTrace();
                    	DBMSdisconnect();
                    	System.exit(1);
            	}

            	bw_log = new BufferedWriter(fw_log);

        }
        
	/* ****** Write Log ****** */
        public void writeLog(String logStr)
        {
       
                long time = System.currentTimeMillis();
                SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");	// formatting date
                String timeStr = dayTime.format(new Date(time));

                try {
			bw_log.write("TIME : " + timeStr + "\tSTATUS : " +logStr+"\n");
                        bw_log.flush();
                } catch (IOException e) {
                	System.out.println("ERROR : DBlog write error... T.T");
                    	e.printStackTrace();
                    	DBMSdisconnect();
                    	System.exit(1);
                }


        }

	/* ****** Call DBConnection Function + get ResultSet ****** */
        public void getResultSet()
        {
                // DB Connection function call

                getDBConnection(2);	// connect to local server (lab DB server)
                try {
                        stmt2 = con2.createStatement();
                        System.out.println("#########stmt2 connection success!!#########");

                } catch (SQLException e) {
                        e.printStackTrace();
                        writeLog("ERROR : stmt2 create error... T.T");
                        System.out.println("ERROR : stmt2 create error... T.T");

                        DBMSdisconnect();
                        System.exit(1);
                }
                writeLog("Statement2 Connection success! :D");

                getDBConnection(1); 	// connect to remote server (SW Capability Development Center)
                try {
                        stmt1 = con1.createStatement();
//                      rs = stmt1.executeQuery(sqlQuery); // sql connection
                        System.out.println("#########executeQuery success!!#########");

                } catch (SQLException e) {
                        e.printStackTrace();
                        writeLog("ERROR : stmt1 create error... T.T");
                        System.out.println("ERROR : stmt1 create error... T.T");
                        DBMSdisconnect();
                        System.exit(1);
                }

                writeLog("Statement1 Connection Success! :D");

                return;

        }

	/* ****** Initialize sqlQuery and tableName ****** */
        public void sqlQueryInitialize(int n)
        {
                if(n==1)
                        tableName = "changes";
                else if(n==2)
                        tableName = "change_messages";
                else if(n==3)
                        tableName = "accounts";
                else if(n==4)
                        tableName = "patch_comments";
                else if(n==5)
                        tableName = "patch_sets";
                else if(n==6)
                        tableName = "patch_set_approvals";
                else ;
               

		sqlQuery = "select * from "+tableName;
 
                writeLog("....................TABLE <"+tableName+">.....................");
                writeLog("SELECT * FROM "+tableName);

                System.out.println("....................TABLE <"+tableName+">.....................");

                return;


        }

        /* ****** Query execute function ****** */
        public void executeQuery()
        {
                try {
                        rs = stmt1.executeQuery(sqlQuery);
                } catch (SQLException e) {
                	writeLog("ERROR : execute Query error... T.T");
                        System.out.println("ERROR : execute Query error... T.T");
                        DBMSdisconnect();
                        e.printStackTrace();
                        System.exit(1);
                } // sql connection
                
                writeLog("executeQuery success! :D");
                System.out.println("######### executeQuery success! #########");

        }

        /* ****** Data (center > lab) + insert data into DB (using query : LOAD DATA INFILE) ****** */
        public void processResultSet()
        {
                // file Generation
       		//String file_name = "data_.rtf";        
       		//f = new File("C:\\"+file_name);         // windows

            	f = new File(dataFile);                 // linux
							// dataFile : RawDataSet.dat
                try {
                        fw = new FileWriter(f);
                        fw.flush();
                } catch (IOException e) {
                	writeLog("ERROR : FileWriter error... T.T");
                        System.out.println("ERROR : FileWriter error... T.T");
                        e.printStackTrace();
                        DBMSdisconnect();
                }

                bw = new BufferedWriter(fw);
                
                /////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////
                // get the ResultSet Data
                LinkedHashMap<String, String> rowDetails = new LinkedHashMap<String, String>();	
									// 1st argument : key as columnName, 2nd argument : value as columnValue
                LinkedHashMap<String, LinkedHashMap<String, String>> resultMap = new LinkedHashMap<String, LinkedHashMap<String, String>>();	
									// 1st argument : key as a row number, 2nd argument : rowDetails (later)

                ResultSetMetaData rsmd = null;
                int colCount = 0;

                //int chk_ = 1;		// for console	
                if(rs!=null){

			// get ResultSetMetaData from ResultSet (for next step : initializing resultMap)
                        try {
                                rsmd = (ResultSetMetaData) rs.getMetaData();
                        } catch (SQLException e1) {
                                writeLog("ERROR : rs.getMetaData() error... T.T");
                                System.out.println("rs.getMetaData() error...");
                                e1.printStackTrace();
                                DBMSdisconnect();
                                System.exit(1);
                        }

                        writeLog("Get ResultSet MetaData SUCCESS :D");


			// initialize resultMap
			try {
				int rowCount = 1;
                                colCount = rsmd.getColumnCount();	// count the number of columns

                                while(rs.next()){

                                        for(int i=1; i<=colCount; i++)
                                                rowDetails.put(rsmd.getColumnName(i), rs.getString(i));

                                      //System.out.print(" chk : "+chk_);
                                      //chk_++;

                                        resultMap.put(new Integer(rowCount).toString(), rowDetails);
                                        rowCount ++;
                                        rowDetails = new LinkedHashMap<String, String>();

                                } // end of while loop

			} catch (SQLException e) {
                                writeLog("ERROR : rsmd.getColumnCount() error... T.T");
                                System.out.println("ERROR : rsmd.getColumnCount() error... T.T");
                                e.printStackTrace();
                                DBMSdisconnect();
                                System.exit(1);
                        }

                }


                /////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////
                // attribute read
                Map<String, String> columnDetails = resultMap.get("1");
                Set<String> attributeSet = columnDetails.keySet();

                writeLog("Get the resultMap size : "+resultMap.size());

                System.out.println("CHECK - resultMap.size : "+resultMap.size());

                /////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////
                // data write
                writeLog("#########  write to RawDataSet.dat #########");
                System.out.println("#########  write to RawDataSet.dat #########");
                
                
                //int chk = 1;		// console check
		final String separator = " @ysy@ ";

                for(int i=1 ; i<=resultMap.size(); i++){                

                        columnDetails = resultMap.get(new Integer(i).toString());
                        String data_string = null;
                        String data_temp_string = "";

                        int j =1;
                        int flag = 0;

                        for(String s2:attributeSet){

                                String temp_str = columnDetails.get(s2);        

				// if column value is null
                                if(temp_str==null){

                                        if(flag ==1){
                                        //      System.out.print("null check!  ");
                                                temp_str = "NULL";	// value "NULL", not null

                                                if(j==colCount)
                                                        data_string = data_temp_string + temp_str;
                                                else
                                                        data_string = data_temp_string + temp_str+ separator;
 
                                                j++;
                                                data_temp_string = data_string;

                                        }

                                        else {  // if there is null in the 1st row 
                                                temp_str = "NULL";
                                                data_string = temp_str+ separator;
                                                data_temp_string = data_string;
						j++;
                                        }

                                        flag = 1;
                                        continue;
                                }

				// column value is not null
                                else{
                                        // for data format in sql (special character)
					// ***** replace sequence is very important *****
					// ***** do not change if there is no error *****
                                        temp_str = temp_str.replace("\\", "\\\\");
                                        temp_str = temp_str.replace("\r", "\\r");
                                        temp_str = temp_str.replace("\\n", "\\\\n"); 	// <---------
                                        temp_str = temp_str.replace("\n", "\\n");       // <---------
                                        temp_str = temp_str.replace("'", "\\'");

				
					// last column check
                                        if(j==colCount)
                                                data_string = data_temp_string + temp_str;

                                        else
                                                data_string = data_temp_string +temp_str+separator;


                                        data_temp_string = data_string;
                                        flag = 1;
                                        j++;
                                }
                        } // end of inner for loop

			// for updating week column in table1
			if(table1Flag == 1)
                       		data_string = data_temp_string + separator + "NULL";
			else
				data_string = data_temp_string ;

			// insert '\n' after reading one row
                        try {
                                bw.write(data_string+"\n");
                                bw.flush();
                                ////////////////////////////////////////////////
                                //System.out.print("  check : " + chk);
                                //chk ++;
                                ////////////////////////////////////////////////

                        } catch (IOException e) {
                        	writeLog("ERROR : data_string write error... T.T");
                        	System.out.println("ERROR : data_string write error... T.T");
                                e.printStackTrace();
                                DBMSdisconnect();
                                System.exit(1);
                        }
                } // end of for loop

                writeLog("Write to RawDataSet.dat SUCCESS! :D");
                System.out.println("######### Write to RawDataSet.dat SUCCESS! #########");


                ///////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////
                // LOAD DATA INFILE 

		/* ****** BEFORE LOAD DATA INFILE : TRUNCATE TABLE ****** */
                try {
                        stmt2.executeUpdate("TRUNCATE TABLE "+tableName);
                } catch (SQLException e2) {
                	writeLog("ERROR : TRUNCATE TABLE error... T.T");
                        System.out.println("ERROR : TRUNCATE TABLE error... T.T");
                        e2.printStackTrace();
                        DBMSdisconnect();
                        System.exit(1);
                }
                
                writeLog("TRUNCATE TABLE "+tableName);


                /* ****** LOAD DATA INFILE  cf)INSERT  ****** */
                String loadQuery = "LOAD DATA LOCAL INFILE '"+dataFile+"' INTO TABLE "+tableName+" FIELDS TERMINATED BY '"+separator+"' LINES TERMINATED BY '\n'";

                writeLog("START INSERT TABLE "+tableName);
                System.out.println("######### START INSERTION! #########");

                // execute query
		try {
			stmt2.executeUpdate(loadQuery);

                } catch (SQLException e) {
                        writeLog("ERROR : executeUpdate error...(loadQuery) T.T ");
                        System.out.println("ERROR : executeUpdate error... T.T");
                        e.printStackTrace();
                        DBMSdisconnect();
                        System.exit(1);
                }

                writeLog("executeUpdate SUCCESS! :D");
	
                return ;

        }

	/* ****** Week Update ****** */
        public void weekUpdate()
        {
                // Update Week Column ***************
                String weekUpdateStr = "update changes c set inweek = (select w.week from master_week w where c.created_on between w.start and w.end);";

                try {
                        stmt2.executeUpdate(weekUpdateStr);

                } catch (SQLException e) {
                        writeLog("ERROR : executeUpdate error... weekUpdateStr - "+weekUpdateStr);
                        System.out.println("ERROR : executeUpdate error... T.T");
                        e.printStackTrace();
                        DBMSdisconnect();
                        System.exit(1);
                }

		table1Flag = 0;	// from 1 to 0

                writeLog("Week Update SUCCESS!:D");

                return;
        }

        /* ****** DBMS Connection ****** */
        public void getDBConnection(int n) 
        {

		// connect to remote server (SW Capability Development Center)
                if(n==1){
                        String URL = "jdbc:mysql://binary.lge.com:3306/gerrit_swp";
                        String user = "swp_select_only";
                        String passwd = "lge123";

                        try {
                                Class.forName("com.mysql.jdbc.Driver");
                        } catch (ClassNotFoundException e) {
                                writeLog("ERROR : Class Not Found " +e.getMessage());
                        	System.err.println("Class Not Found : " + e.getMessage());
                                System.exit(1);
                        }

                        writeLog("Load com.mysql.jdbc.Driver - connection 1");

                        try {
                                con1 = DriverManager.getConnection(URL, user, passwd);
                                System.out.println("Successfully connected to DBMS! - connection 1");
                        } catch (SQLException e) {
                        	writeLog("ERROR : Sql Error " + e.getMessage());
                        	System.err.println("SQL Error : " + e.getMessage());
                                System.exit(1);
                        }
                        writeLog("Successfully connected to DBMS! - connection 1");

                }
           
		// connect to lab server
                else if(n==2){
                        DBMSdisconnect();	// to avoid duplicate connection

                        String URL = "jdbc:mysql://10.177.234.48:3306/gerrit_infra_test";
                        String user = "heesung";
                        String passwd = "multisqe";  //not null sarang hae -by.kms D


                        try {
                                Class.forName("com.mysql.jdbc.Driver");
                        } catch (ClassNotFoundException e) {
                       	    	writeLog("ERROR : Class Not Found " + e.getMessage());
                                System.err.println("Class Not Found : " + e.getMessage());
                                DBMSdisconnect();
                                System.exit(1);
                        }

                        writeLog("Load com.mysql.jdbc.Driver - connection 2");

                        try {
                                con2 = DriverManager.getConnection(URL, user, passwd);
                                System.out.println("Successfully connected to DBMS! - connection 2");
                        } catch (SQLException e) {
                        	writeLog("ERROR : Sql Error " + e.getMessage());
                                System.err.println("SQL Error : " + e.getMessage());
                                DBMSdisconnect();
                                System.exit(1);
                        }

                		writeLog("Successfully connected to DBMS! - connection 2");


                }

                else ;

                return ;
        }


        /* ****** DBMS Disconnection ****** */
        public void DBMSdisconnect()
        {
                // Remote Server (Central DB Server)
                try {
                        if (stmt1 != null) {
                                stmt1.close();
                                System.out.println("Successfully Dissconnect Statement - 1! :D");
                        }
                } catch (SQLException e1) {
                	writeLog("ERROR : Statement-1 Close error... T.T");
                        System.out.println("ERROR : Statement-1 Close error... T.T");
                        e1.printStackTrace();
                        System.exit(1);
                }


                writeLog("Successfully Dissconnect Statement - 1! :D");

                try {
                        if (con1 != null) {
                                con1.close();
                                System.out.println("Successfully Disconnect Connection - 1! :D");
                        }
                } catch (SQLException e) {
                	writeLog("ERROR : Connection-1 Close error... T.T");
                        System.out.println("ERROR : Connection-1 Close error... T.T");
                        e.printStackTrace();
                        System.exit(1);
                }


                writeLog("Successfully Disconnect Connection -1! :D");

                /////////////////////////////////////////////////////////////
                // local PC or lab DB Server
                try {
                        if (stmt2 != null) {
                                stmt2.close();
                                System.out.println("Successfully Disconnect Statement - 2! :D");
                        }
                } catch (SQLException e1) {
                	writeLog("ERROR : Statemet-2 Close error... T.T");
                        System.out.println("ERROR : Statement-2 Close error... T.T");
                        e1.printStackTrace();
                        System.exit(1);
                }

                writeLog("Successfully Disconnect Statement -2! :D");

                try {
                        if (con2 != null) {
                                con2.close();
                                System.out.println("Successfully Disconnect Connection - 2! :D");
                        }
                } catch (SQLException e) {
                	writeLog("ERROR : Connection-2 Close error... T.T");
                        System.out.println("ERROR : Connection-2 Close error... T.T");
                        e.printStackTrace();
                        System.exit(1);
                }

                writeLog("Successfully Disconnect Connection -2! :D");

        }

}

