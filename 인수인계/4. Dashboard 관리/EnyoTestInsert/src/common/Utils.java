package common;

import garnetApi.GarnetApi;
import garnetApi.GarnetApiInfo;

import java.io.File;
import java.util.ArrayList;

public class Utils {

	/**
	 * File객체가 file인지 Directory인지 여부를 출력<p>
	 * 예) file? : false	Directory? : true
	 * @param File
	 * @author heesung.eun
	 * @return void
	 */
	public static void printWhetherFileOrDirectory(File file){
		System.out.print("file? : " + file.isFile());
		System.out.println("\tDirectory? : " + file.isDirectory());
	}
	/**
	 * ArrayList<File>객체의 file이름을 나열하여 출력<p>
	 * 
	 * @param ArrayList<File>
	 * @author heesung.eun
	 * @return void
	 */
	public static void printFileNameList(ArrayList<File> file){
		for (int i = 0; i < file.size(); i++) {
			System.out.println(file.get(i).getName());
		}
	}
	
	/**
	 * ArrayList<File>객체의 멤버변수 name을 기준으로 정렬 (오름차순)<p>
	 * 
	 * @param ArrayList<File>
	 * @author heesung.eun
	 * @return void
	 */
	public static void arrayListFileToASC(ArrayList<File> array){
		if(array.get(0) instanceof File){
			for(int i = 0 ; i < array.size()-1 ; i++){
				for(int j = i+1 ; j < array.size() ; j++){
					if(array.get(i).getName().compareTo(array.get(j).getName()) > 0 ){
						File temp = array.get(i);
						array.set(i, array.get(j));
						array.set(j, temp);
					}
				}
			}
		}
	}
	
	/**
	 * ArrayList<GarnetApi>객체의 멤버변수 name을 기준으로 정렬 (오름차순)<p>
	 * 
	 * @param ArrayList<File>
	 * @author heesung.eun
	 * @return void
	 */
	public static void arrayListGarnetApiToASC(ArrayList<GarnetApi> array){
		if(array.get(0) instanceof GarnetApi){
			for(int i = 0 ; i < array.size()-1 ; i++){
				for(int j = i+1 ; j < array.size() ; j++){
					if(array.get(i).getName().compareTo(array.get(j).getName()) > 0 ){
						GarnetApi temp = array.get(i);
						array.set(i, array.get(j));
						array.set(j, temp);
					}
				}
			}
		}
	}
	
	/**
	 * String내에 포함된 특정 문자 갯수를 반환<p>
	 * 
	 * @param String text, String value
	 * @author heesung.eun
	 * @return int
	 */
	public static int getCountString(String text, String value){
		return text.split(value).length-1;
	}
	
	/**
	 * apiInfo의 정보를 출력<p>
	 * 		예)<br> 
	 * 		### 1. g.Button<br>
	 *		file : Button.js<br>
	 *		name : g.Button<br>
	 * 		kind : enyo.Button<br>
	 *		public : small
	 * @param GarnetApiInfo apiInfo
	 * @author heesung.eun
	 * @return void
	 */
	public static void printGarnetApiInfo(GarnetApiInfo apiInfo){
		System.out.println("file : " + apiInfo.getFile().getName());
//		System.out.println("description : "+ apiInfo.getDescription());
		System.out.println("name : " + apiInfo.getName());
		System.out.println("kind : "+ apiInfo.getKind());
		System.out.print("public : ");
		for (int i = 0; i < apiInfo.getPublics().size(); i++) {
			System.out.print(apiInfo.getPublics().get(i).getOptionName());
			if(apiInfo.getPublics().get(i).getType().equals("published")){
				System.out.print("(published)");
			}
			if(apiInfo.getPublics().get(i).getType().equals("function")){
				System.out.print("(function)");
			}
			if(apiInfo.getPublics().get(i).getType().equals("public")){
				System.out.print("(public)");
			}
			if(i+1 != apiInfo.getPublics().size()){
				System.out.print(", ");
			}
		}
		System.out.println();
	}
}
