package enyotest;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class EnyoTestMakeIntegrated{
	
	public boolean makeIntegrated(File originFile, String path, String resultName) throws FileNotFoundException, IOException {
		boolean successFlag = false;
		
		String s;
		int allCount = 0;
		int passCount = 0;
		int failCount = 0;
		int errorCount = 0;
		
		// Verify API HTML File List
		File[] fileList = originFile.listFiles();
		ArrayList<File> componentFileList = new ArrayList<File>();
		for(int i = 0 ; i < fileList.length ; i++){
			if(fileList[i].getName().substring(fileList[i].getName().indexOf(".")).contains("html")){
				componentFileList.add(fileList[i]);
			}
		}
		System.out.println("- Api Count : " + componentFileList.size());
		StringBuffer resultHtml = new StringBuffer();
		
		if(componentFileList.size() == 0){
			System.out.println("## can not make HTML (NOT FOUND API HTML)");
			return false;
		}
		
		// Arrange FileList (ASC)
		for(int i = 0 ; i < componentFileList.size()-1 ; i++){
			for(int j = i+1 ; j < componentFileList.size() ; j++){
				if(componentFileList.get(i).getName().compareTo(componentFileList.get(j).getName()) > 0 ){
					File temp = componentFileList.get(i);
					componentFileList.set(i, componentFileList.get(j));
					componentFileList.set(j, temp);
				}
			}
		}
		
		for(int i = 0 ; i < componentFileList.size() ; i++){
			System.out.println(componentFileList.get(i).getName());
		}
		
/*		if(true){
		return false; 
		}*/
		
		// Get Version & Start Time ** 
		String version = "";
		String startTime = "";
		BufferedReader in = new BufferedReader(new FileReader(componentFileList.get(0)));
		while ((s = in.readLine()) != null) {
//	        System.out.println(s);
	        if(s.contains("<p class='attribute'><strong>Version:</strong>")){
	        	version = s.replace("<p class='attribute'><strong>Version:</strong> ","").replace("</p>", "");
	        }
	        if(s.contains("<p class='attribute'><strong>Start Time:</strong>")){
	        	startTime = s.replace("<p class='attribute'><strong>Start Time:</strong> ","").replace("</p>", "");
	        }
	        if(!version.equals("") && !startTime.equals("")){
	        	break;
	        }
        }
		System.out.println("version : " + version + "\nstartTime : " + startTime);
		in.close();
		
		if(version.equals("") && startTime.equals("")){
			System.out.println("## can not make HTML (NOT FOUND VERSION OR START_TIME)");
			return false;
		}
		
		// Add Header to Result HTML
		FileReader headerFile =  new FileReader(new File(path + "format/header.txt"));
		in = new BufferedReader(headerFile);
		while ((s = in.readLine()) != null) {
			resultHtml.append(s + "\n");
		}
		headerFile.close(); in.close();
		resultHtml.append("<p class='attribute'><strong>Version:</strong> " + version + "</p>\n");
		resultHtml.append("<p class='attribute'><strong>Start Time:</strong> " + startTime + "</p>");
		headerFile =  new FileReader(new File(path + "format/header2.txt"));
		in = new BufferedReader(headerFile);
		while ((s = in.readLine()) != null) {
			resultHtml.append(s + "\n");
		}
		headerFile.close(); in.close();
		
		// Add API TestCases
		System.out.println("\n----------------------Add API TestCases----------------------");
		for(int i = 0 ; i < componentFileList.size() ; i++){
			in = new BufferedReader(new FileReader(componentFileList.get(i)));
			System.out.println(componentFileList.get(i).getName());
			boolean readyFlag = false; boolean startFlag = false; boolean stopFlag = false; boolean canGetResultFlag = false;
			while ((s = in.readLine()) != null) {
				// Add TestCases
				if(startFlag){
					if(s.contains("<tr id='total_row'>")){
						stopFlag = true;
					}
				}
				if(!stopFlag){
					if(startFlag){
						s = s.replace("<tr id='pt1", "<tr id='pt" + (i+1));
						s = s.replace("div_pt1", "div_pt" + (i+1));
						s = s.replace("<tr id='ft1", "<tr id='ft" + (i+1));
						s = s.replace("div_ft1", "div_ft" + (i+1));
						s = s.replace("javascript:showClassDetail('c1", "javascript:showClassDetail('c" + (i+1));
						resultHtml.append(s + "\n");
					}
				}
				if(readyFlag){
					if(s.trim().contains("</tr>")){
						startFlag = true;
						readyFlag = false;
					}
				}
				if(s.contains("<td align='center'>duration</td>")){
					readyFlag = true;
				}
				
				// Result Count
		    	if(s.contains("<td colspan='5' align='center'>")){
		    		canGetResultFlag = true;
		    	}
		    	if(canGetResultFlag){
		    		if(s.contains("pass")){
		    			passCount++; canGetResultFlag = false;
		    		}
		    		if(s.contains("fail")){
		    			failCount++; canGetResultFlag = false;
		    		}
		    		if(s.contains("error")){
		    			errorCount++; canGetResultFlag = false;
		    		}
		    	}
			}
			in.close();
		}
		allCount = passCount + failCount + errorCount;
		System.out.println("-------------------------------------------------------------\n");
		
		// Add Footer to Result HTML
		resultHtml.append("<tr id='total_row'>\n" 
				+ "<td align='center'>Total</td>\n" 
				+ "<td align='right'>" + allCount + "</td>\n"
				+ "<td align='right'>" + passCount + "</td>\n"
				+ "<td align='right'>" + failCount + "</td>\n"
				+ "<td align='right'>" + errorCount + "</td>\n"
				+ "<td>&nbsp;</td>\n"
				+ "<td align='center'>-</td>\n"
				+ "</tr>\n"
				+ "</table>\n"
				+ "\n"
				+ "<div id='ending'>&nbsp;</div>"
				+ "\n"
				+ "</body>\n"
				+ "</html>");
		
		if( allCount == 0 ){
			System.out.println("## can not make HTML (NOT FOUND TESTCASES)");
			return false;
		}
		
		BufferedWriter out = new BufferedWriter(new FileWriter(path + resultName));
		out.write(resultHtml.toString());
		out.close();
		
		successFlag = true;
		
		System.out.println("** Generating HTML has done **");
		
		return successFlag;
	}
}