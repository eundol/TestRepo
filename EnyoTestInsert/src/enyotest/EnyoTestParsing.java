package enyotest;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class EnyoTestParsing {
	
	public ArrayList<EnyoTestEntity> parsingParmsFile(File file)
			throws FileNotFoundException, IOException {
		BufferedReader in = new BufferedReader(new FileReader(file));
//		System.out.println(in);
		
		String s;
		
		String name = file.getName().replace(".html", "");
		String version = "";
		String startTime = "";
		
		//File Read **
		//Get Version & Start Time ** 
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
		
	    //confirm #1 **
	    System.out.println("name : " + name);
	    System.out.println("version : " + version);
	    System.out.println("startTime : " + startTime);
	    
	    //Get apiNames ** 
/*	    ArrayList<String> apiNames = new ArrayList<String>();
	    boolean flag = false;
	    while ((s = in.readLine()) != null) {
	    	System.out.println(s);
	    	if(flag){
	    		apiNames.add(s.replace("<td>", "").replace("</td>", ""));
	    		flag = false; 
	    	}
	    	if(s.contains("<tr class='")){
	    		flag = true;
	    	}
	    }*/
	    //confirm #2 **
/*	    for(int i = 0 ; i < apiNames.size() ; i++){
	    	System.out.println(apiNames.get(i));
	    }*/
	    
	    ArrayList<EnyoTestEntity> testList = new ArrayList<EnyoTestEntity>();
	    EnyoTestEntity testEntity = new EnyoTestEntity(name, version, startTime);
	    //Get testEntity & List ** 
	    boolean newApiFlag = false;
	    String apiName = "";
	    boolean createNewEntity = true;
	    boolean canGetResultFlag = false;
	    boolean canReadDescription = false;
	    boolean canReadDuration = false;
	    String description = "";
	    int testcaseCnt = 0 ;
	    while ((s = in.readLine()) != null) {
	    	
	    	//Create Entity
	    	if(createNewEntity){
	    		testEntity = new EnyoTestEntity(name, version, startTime);
	    		description = "";
	    		createNewEntity = false;
	    	}
	    	
	    	//Get API
	    	if(newApiFlag){
	    		apiName = s.replace("<td>", "").replace("</td>", "").trim();;
	    		newApiFlag = false;
	    	}
	    	if(s.contains("<tr class='")){
	    		newApiFlag = true;
	    	}
	    	
	    	//Get TestCase
	    	if(s.contains("<div class='testcase'>")){
//	    		System.out.println(s.substring(s.lastIndexOf("<div class='testcase'>")).replace("</div></td>", "").replace("<div class='testcase'>", ""));
	    		testEntity.setTest_case(s.substring(s.lastIndexOf("<div class='testcase'>")).replace("</div></td>", "").replace("<div class='testcase'>", "").trim());
	    		testcaseCnt++;
	    	}
	    	
	    	//Get result
	    	if(s.contains("<td colspan='5' align='center'>")){
	    		canGetResultFlag = true;
	    	}
	    	if(canGetResultFlag){
	    		if(s.contains("pass")){
	    			testEntity.setResult("pass"); canGetResultFlag = false;
//	    			System.out.println("pass " + testEntity.getTest_case());
	    		}
	    		if(s.contains("fail")){
	    			testEntity.setResult("fail"); canGetResultFlag = false;
//	    			System.out.println("fail " + testEntity.getTest_case());
	    		}
	    		if(s.contains("error")){
	    			testEntity.setResult("error"); canGetResultFlag = false;
//	    			System.out.println("error " + testEntity.getTest_case());
	    		}
	    	}
	    	
	    	//Get description
	    	if(s.contains("</pre>")){
	    		testEntity.setDescription(description.trim());
//	    		System.out.println(description);
	    		canReadDescription = false;
	    	}
	    	if(canReadDescription){
	    		description += s + "\n";
	    	}
	    	if(s.contains("<pre>")){
	    		canReadDescription = true;
	    	}
	    	
	    	//Get duration
	    	if(canReadDuration){
	    		testEntity.setDuration(s.trim());
//	    		System.out.println(s);
	    		canReadDuration = false;
//	    		createNewEntity = true;
//	    		System.out.println(testEntity.getName() + testEntity.getVersion() + testEntity.getStart_time() + testEntity.getApi() + testEntity.getTest_case() + testEntity.getResult() + testEntity.getDuration());
//	    		testList.add(testEntity); // add entity to list
	    	}
	    	if(s.trim().equals("<td align='right'>")){
	    		canReadDuration = true;
	    	}
	    	
	    	//add entity
	    	if(testEntity.getTest_case() != null){
	    		if(s.contains("</tr>")){
	    			createNewEntity = true;
	    			testList.add(testEntity);
	    			testEntity.setApi(apiName);
//	    		System.out.println(testEntity.getName() + testEntity.getVersion() + testEntity.getStart_time() + testEntity.getApi() + testEntity.getTest_case() + testEntity.getResult() + testEntity.getDuration());
	    		}
	    	}
	    }
	    //confirm #3 **
	    System.out.println("testcase Count : " + testcaseCnt);
	    in.close();
	    
	    System.out.println("** Parsing has done **");
	    
	    return testList;
	}
}
