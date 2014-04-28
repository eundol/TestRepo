package enyotest;
import java.io.File;
import java.util.ArrayList;

public class EnyoTestMain {

	public static void main(String[] args) throws Exception {
		
//		String path = "/home/seadmin/workspace/EnyoTest/web/report/";
//		String path = "C:/eun/workspace/EnyoTest/web/report/";
		String path = "";
		
		String inputText = args[0];
		String type = "API Test";
		if((args[0].substring(0, 2)).equals("ST")){
			type = "Senario Test";
		}
		
		// # java -jar executefile.jar args[0]
		
		System.out.println("Name : " + inputText);
		System.out.println("Type : " + type);
		
		File file = new File(path + inputText);
		System.out.println("file? : " + file.isFile());
		System.out.println("Directory? : " + file.isDirectory());
		
		// HTML Integrated Generate (if Directory)
		String resultName = "";
		boolean makeSuccessFlag = true;
		if(file.isDirectory()){
			resultName = inputText + ".html";
			System.out.println("** Start Generate HTML ** - Result File Name : " + resultName);
			makeSuccessFlag = new EnyoTestMakeIntegrated().makeIntegrated(file, path, resultName);
			file = new File(path + resultName);
			if(!makeSuccessFlag){
				System.out.println("## fail to make HTML integrated.. ##");
			}
		}
		
		// HTML Parsing **
		ArrayList<EnyoTestEntity> testList = new ArrayList<EnyoTestEntity>();
		if(makeSuccessFlag){
			// Parsing and return list
			if(file.isFile()){
				System.out.println("** Start to parsing : " + file.getName());
				testList = new EnyoTestParsing().parsingParmsFile(file);
			}else{
				System.out.println("## this is incorrect file ##");
			}
		}
			
		// DB Insert
		boolean result = false;
		if(!testList.isEmpty()){
			result = new EnyoTestAddData().insertTestResult(testList, type);
		}
	
		// result
		if(result){
			System.out.println("** success! :) **");
		}else{
			System.out.println("## fail.. :( ##");
		}
		
	}
}
