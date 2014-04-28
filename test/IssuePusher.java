import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

/**
 * @author myoungsoo.kang
 *
 */
public class IssuePusher {

	static String  issueXmlPath = "/test/issue.xml";
//	static String  issueXmlPath = "C:\\issue.xml";  //Local Test용

	final String dataFile = "/test/RawDataSet.dat";
	final String logFile = "/test/IssuePusher.log";
	final String separator = " @kms@ ";
	
	/**
	 * // constructor
	 */
	public IssuePusher() {
	}

	int _cntt = 0;
	Connection _con1 = null;
	Statement _stmt1 = null;

	String _tableName = "jira_issue";
	String _databaseName = "tracker_infra";

	// for log file
	File _fLog = null;
	FileWriter _fwLog = null;
	BufferedWriter _bwLog = null;

	// for result data file
	File _fData = null;
	FileWriter _fwData = null;
	BufferedWriter _bwData = null;
	
	static IssuePusher ip;
	NodeList _listOfIssues;
	static LinkedHashMap<String, String> _rowDetails = new LinkedHashMap<String, String>();

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		ip = new IssuePusher();
		
		
		ip.makeFile();
		ip.makeResultData();
		
		ip.getDBConnection();
		ip.insertIssueData();
		ip.dateUpdateToNull();

		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ip.DBMSdisconnect();
		}
	} // end of main

	
	public void dateUpdateToNull()
	{
		String query = "update jira_issue i set i.duedate = null where i.duedate = '0000-00-00'";

	        try {
                       _stmt1.executeUpdate(query);

                } catch (SQLException e) {
                       // TODO Auto-generated catch block
                        writeLog("ERROR : executeUpdate error... insertString - "+ query);
                        System.out.println("ERROR : executeUpdate error... T.T");
                        e.printStackTrace();
                        DBMSdisconnect();
                        System.exit(1);
                }

                writeLog("Date Update To Null SUCCESS!:D");

                return;
	
	}
	/**
	 * makeResultData
	 */
	public void makeResultData() {
		

		try {
			DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
			
			File file = new File(issueXmlPath);
			
			InputStream inputStream= new FileInputStream(file);
			Reader reader = new InputStreamReader(inputStream,"UTF-8");
			InputSource is = new InputSource(reader);
			is.setEncoding("UTF-8");
			Document doc = docBuilder.parse(is);

			// normalize text representation
			doc.getDocumentElement().normalize();
			System.out.println("Root element of the doc is  ["+ doc.getDocumentElement().getNodeName() + "]");

			_listOfIssues = doc.getElementsByTagName("issue");
			int totalIssues = _listOfIssues.getLength();
			System.out.println("Total no of issue :  [" + totalIssues + "] ");

			//이슈가 한건도 없을경우 예외처리 
			if(_listOfIssues.getLength() < 1 ){
				writeLog("No Issue. or Couldn't parse jira issues.");
				System.out.println("No Issue. or Couldn't parse jira issues.");
			}else{
				// 이슈 건수만큼 for문.
				for (int s = 0; s < _listOfIssues.getLength(); s++) {
					System.out.println("=================================================");
					Node nNode = _listOfIssues.item(s);

					if (nNode.getNodeType() == Node.ELEMENT_NODE) {
						Element eElement = (Element) nNode;
						
						NodeList n1List = eElement.getElementsByTagName("field");
						
						// 23개의 필드값을 하나씩 loop돌려서 rowDetails에 저장하기
						for(int i=0 ; i < n1List.getLength() ; i++){
							
							String nodeName = "";
							String nodeValue = "";
							
							nodeName = ((Element) n1List.item(i)).getAttribute("name");

							if (nodeName.equals("component")|| nodeName.equals("affectversion")|| nodeName.equals("fixversion")) {
									// No Action !!
							}else{
										// 만약 getTextContent()의 값이null이거나 없는경우 "NULL"을 삽입
										nodeName = ((Element) n1List.item(i)).getAttribute("name");
										if( n1List.item(i).getTextContent().equals("")){
											_rowDetails.put(nodeName, "null");
										}else if( n1List.item(i).getTextContent().isEmpty()){
											_rowDetails.put(nodeName, "NULL");
								
										}else {
											nodeValue = n1List.item(i).getTextContent();
											//HashMap에 Insert. component,affectversion,fixversion 일경우는 N개의 값이 올수 있으므로 보류.
											// 2nd if else	// 나머지 놈들은 HashMap에 저장
												_rowDetails.put(nodeName, nodeValue);
										}// end of if
							}

						}//end of for loop
					}// end of if clause

					List<String> keys = new ArrayList<String>(_rowDetails.keySet());
					for (String key : keys) {
						System.out.println(key + ": " + _rowDetails.get(key));
		    		}

					// 1 issue insert ( for loop )
					String data_string = null;
					String data_temp_string = null;

					int j = 1;
					int flag = 0;
					//String separator = " @kms@ ";
					
					data_temp_string = "";
					for (String key : keys) {

						String temp_str = _rowDetails.get(key); // null->

						if (temp_str == null || temp_str.equals("null")) {
							if (flag == 1) {
								 System.out.print("null check!  ");
								 temp_str = "null";

								if (j == keys.size())
									data_string = data_temp_string + temp_str;
								else
									data_string = data_temp_string + temp_str + separator;
								j++;
								data_temp_string = data_string;
								// continue;
							} else { // 처음 문장 시작에 NULL 이 있을 때
								temp_str = "null";
								data_string = temp_str + separator;

								j++;
								data_temp_string = data_string;
							}
							flag = 1;
							continue;
						} else { // case : temp_string is not null
							// for data format in sql (converting special character)
							temp_str = temp_str.replace("\\", "\\\\");
							temp_str = temp_str.replace("\r", "\\r");
							temp_str = temp_str.replace("\\n", "\\\\n"); // <-----
							temp_str = temp_str.replace("\n", "\\n");    // <-----
							temp_str = temp_str.replace("'", "\\'");

							if (j == keys.size())
								data_string = data_temp_string +temp_str;
							else
								data_string = data_temp_string +temp_str +separator;

							data_temp_string = data_string;
							flag = 1;
							j++;
						}
					}
					data_string = data_temp_string;

					try {
						_bwData.write(data_string + "\n");
						_bwData.flush();
					} catch (IOException e) {

						// TODO Auto-generated catch block
						System.out.println("ERROR : data_string write error... T.T");
						e.printStackTrace();
						DBMSdisconnect();
						System.exit(1);
					}
				}// end of for loop with s var
				
			}
			
			
		} catch (SAXParseException err) {
			System.out.println("** Parsing error" + ", line "
					+ err.getLineNumber() + ", uri " + err.getSystemId());
			System.out.println(" " + err.getMessage());

		} catch (SAXException e) {
			Exception x = e.getException();
			((x == null) ? e : x).printStackTrace();

		} catch (Throwable t) {
			t.printStackTrace();
		}

	}

	
	public void insertIssueData() {

		try {
			_stmt1 = _con1.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
			writeLog("ERROR : _stmt1 create error... T.T");
			System.out.println("ERROR : _stmt1 create error... T.T");
			DBMSdisconnect();
			System.exit(1);
		}

		// Database : tracker_infra , Table : jira_issue
		
		
		// BEFORE INSERTION (1)
			FileReader fr = null;
			try {
				fr = new FileReader(_fData);
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				System.out.println("ERROR : file reader error... T.T");
				e1.printStackTrace();
				DBMSdisconnect();
				System.exit(1);
			}

			BufferedReader br = new BufferedReader(fr);


		// TRUNCATE table
		String truncateString = "TRUNCATE TABLE " + _tableName;
		try {
			_stmt1.executeUpdate(truncateString);
		} catch (SQLException e) {
			writeLog("ERROR : TRUNCATE TABLE error... T.T");
			System.out.println("ERROR : TRUNCATE TABLE error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
		// INSERTION
                String insertString = "LOAD DATA LOCAL INFILE '"+dataFile+"' INTO TABLE "+_tableName+" FIELDS TERMINATED BY '"+separator+"' LINES TERMINATED BY '\n'";

		int flag = 1;
		int cnt = 1;

		writeLog("START INSERT IGNORE TABLE " + _tableName);
		System.out.println("######### START INSERTION! #########");
		System.out.println("######### 이슈개수! #########                   >>>>>> " + _listOfIssues.getLength());

                try {
			_stmt1.executeUpdate(insertString);                       
                        System.out.println(insertString+ "[[[[[[[[[어쭈구리]]]]]]]]]]]");
                } catch (SQLException e) {                                                             
                     // TODO Auto-generated catch block
                        writeLog("ERROR : executeUpdate error... insertString - " + insertString);
                        System.out.println("ERROR : executeUpdate error... T.T");
                        e.printStackTrace();
                        DBMSdisconnect();
                        System.exit(1);
                }

	}

	public void DBMSdisconnect() {
		// Remote Server (Central DB Server)
		try {
			if (_stmt1 != null) {
				_stmt1.close();
				System.out
						.println("Successfully Dissconnect Statement - 1! :D");
			}
			if (_con1 != null) {
				_con1.close();
				System.out
						.println("Successfully Dissconnect connection - 1! :D");
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			writeLog("ERROR : Statement-1 Close error... T.T");
			System.out.println("ERROR : Statement-1 Close error... T.T");
			e1.printStackTrace();
			System.exit(1);
		}
	}

	
	/**
	 * // DBMS Connection
	 */
	public void getDBConnection() {

		DBMSdisconnect();

		String URL = "jdbc:mysql://10.177.234.48:3306/" + _databaseName;
		String user = "heesung";
		String passwd = "multisqe";

		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {

			// //writeLog("ERROR : Class Not Found " + e.getMessage());
			System.err.println("Class Not Found : " + e.getMessage());
			DBMSdisconnect();
			System.exit(1);
		}

		// //writeLog("Load com.mysql.jdbc.Driver - connection 1");

		try {
			_con1 = DriverManager.getConnection(URL, user, passwd);
			System.out
					.println("Successfully connected to DBMS! - connection 1");
		} catch (SQLException e) {
			// //writeLog("ERROR : Sql Error " + e.getMessage());
			System.err.println("SQL Error : " + e.getMessage());
			DBMSdisconnect();
			System.exit(1);
		}

		// //writeLog("Successfully connected to DBMS! - connection 1");

		return;
	}

	public void  writeLog(String logStr) {

		long time = System.currentTimeMillis();
		SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String time_str = dayTime.format(new Date(time));

		try {
			_bwLog.write("TIME : " + time_str + "\tSTATUS : " + logStr + "\n");
			_bwLog.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR : DBlog write error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}

	}

	/**
	 * Make Data file & Log File
	 */
	public void makeFile() {

		// 1. make data file
		_fData = new File(dataFile);
		
		try {
			_fwData = new FileWriter(_fData);
			_fwData.flush();
		} catch (IOException e) {
			System.out.println("ERROR : file writer error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
		_bwData = new BufferedWriter(_fwData);

		// 2. make log file
		_fLog = new File(logFile);
		try {
			_fwLog = new FileWriter(_fLog);
			_fwLog.flush();
		} catch (IOException e) {
			System.out.println("ERROR : file writer error... T.T");
			e.printStackTrace();
			DBMSdisconnect();
			System.exit(1);
		}
		_bwLog = new BufferedWriter(_fwLog);
	}
	
	public static String getTagValue(String tag, Element eElement) {
		
	    System.out.println("Getting Tage Value for: " + tag);
	    NodeList fieldNameList = eElement.getElementsByTagName("field");
	    
	    for (int i = 0; i < fieldNameList.getLength(); i++) {
	        Node nNode = fieldNameList.item(i);
	        if (((Element) nNode).getAttribute("name").equalsIgnoreCase(tag)) {
	            return nNode.getTextContent();
	        }
	    }
	    return null;
	}

}



