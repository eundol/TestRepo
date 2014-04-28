package garnetApi;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import common.Utils;

public class GarnetGetApiList {
	
	int cnt = 0;
	
	public GarnetGetApiList() {
		super();
	}

	public ArrayList<File> getApiFileList(File originFile) {
		
		File[] fileList = originFile.listFiles();
		ArrayList<File> apiFileList = new ArrayList<File>();
		
		for(int i = 0 ; i < fileList.length ; i++){
			if(!fileList[i].getName().contains("garnet")){
				if(!fileList[i].getName().contains("package")){
					if(!fileList[i].getName().contains("template")){
						if(!fileList[i].getName().contains("Core.js")){
							if(fileList[i].getName().contains(".js")){
								apiFileList.add(fileList[i]);
							}
						}
					}
				}
			}
		}
		Utils.arrayListFileToASC(apiFileList);
		return apiFileList;
	}

	public ArrayList<GarnetApi> getApiList(ArrayList<File> garnetApiFileList) throws FileNotFoundException {
		ArrayList<GarnetApi> result = new ArrayList<GarnetApi>();
		
		System.out.println("================================ GarnetApi ==================================");
		for (int i = 0; i < garnetApiFileList.size(); i++) {
			getApi(garnetApiFileList.get(i), result);
		}
		System.out.println("=============================================================================\ncnt : " + cnt);
		
		Utils.arrayListGarnetApiToASC(result);
//		for (int i = 0; i < result.size(); i++) {
//			System.out.println(result.get(i).getName());
//		}
		return result;
	}

	public void getApi(File file, ArrayList<GarnetApi> list) throws FileNotFoundException{
		Scanner sc = new Scanner(file);
		
		// get name & add in list
		getApiNamesOfFile(file, list, sc);
	}
	
	// get name & add in list
	private void getApiNamesOfFile(File file, ArrayList<GarnetApi> list, Scanner sc) {
		boolean flagPublished = true;
		boolean flagAnotation = false;
		boolean write = false;
		while(sc.hasNext()){
			String line = sc.nextLine();
			if(write && flagPublished && !flagAnotation){
				if(line.contains("name:") && line.contains("g.")){
					System.out.printf(line.replace("name:", "").trim().replace("\"", "").replace(",", ""));
					System.out.println("\t\t file : " + file.getName());
					cnt++;
					list.add(new GarnetApi(line.replace("name:", "").trim().replace("\"", "").replace(",", ""), file));
					write = false;
				}
			}
			if(line.contains("enyo.kind({")){
				write = true;
			}
			if(line.contains("@public") && Utils.getCountString(line, "\t") == 0){
				flagPublished = true;
			}
			if(line.contains("@protected")  && Utils.getCountString(line, "\t") == 0){
				flagPublished = false;
			}
			if(line.contains("/**")  && Utils.getCountString(line, "\t") == 0){
				flagAnotation = true;
			}
			if(line.contains("*/")  && Utils.getCountString(line, "\t") == 0){
				flagAnotation = false;
			}
		}
	}
	
	public ArrayList<GarnetApiInfo> getApiInfoList(ArrayList<GarnetApi> garnetApiList) throws FileNotFoundException {
		ArrayList<GarnetApiInfo> result = new ArrayList<GarnetApiInfo>();
		
		for (int i = 0; i < garnetApiList.size(); i++) {
			GarnetApi api = garnetApiList.get(i);
			GarnetApiInfo apiInfo = new GarnetApiInfo(api.getName(), api.getFile());
			result.add(apiInfo);
		}
		return result;
	}
}
