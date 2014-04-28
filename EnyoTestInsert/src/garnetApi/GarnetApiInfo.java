package garnetApi;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

import common.Utils;

public class GarnetApiInfo extends GarnetApi {

	private String kind;
	private String description;
	private ArrayList<Options> publics;
	private ArrayList<Options> protecteds;
	private ArrayList<Options> privates;
	
	public GarnetApiInfo(String name, File file) throws FileNotFoundException {
		super(name, file);
		
		// get Kind
		getInitialKind(name, file);
		// get description
		getInitialDescription(name, file);
		// get publics
		this.publics = getPublics(name, file);
	}

	// get description
	private void getInitialDescription(String name, File file) throws FileNotFoundException {
		Scanner sc = new Scanner(file);
		String description = "";
		boolean write = false;
		while(sc.hasNext()){
			String line = sc.nextLine();
			if(line.contains("*/") && Utils.getCountString(line, "\t") == 0){
				write = false;
			}
			if(write){
				description += line.replace("\t", "") + "\n";
			}
			if(line.contains("/**") && Utils.getCountString(line, "\t") == 0){
				write = true;
				description = "";
			}
			if(line.contains(name) && line.contains("name:") && Utils.getCountString(line, "\t") == 1){
				if(description.endsWith("\n")){
					description = description.substring(0,description.length()-1);
				}
				this.description = description;
				break;
			}
		}
//		System.out.println(name);
//		System.out.println(this.description);
	}

	// get Kind
	private void getInitialKind(String name, File file) throws FileNotFoundException {
		Scanner sc = new Scanner(file);
		boolean write = false;
		String kind = "null";
		while(sc.hasNext()){
			String line = sc.nextLine();
			if(write){
				if(line.contains("kind:") && Utils.getCountString(line, "\t") == 1){
					kind = line.replace("kind:", "").trim().replace("\"", "").replace(",","");
					write = false;
				}
			}
			if(line.contains(name) && line.contains("name:") && Utils.getCountString(line, "\t") == 1){
				write = true;
			}
			if(line.contains("});") && Utils.getCountString(line, "\t") == 0){
				write = false;
			}
		}
//		System.out.println(name + " ##### " + kind);
		this.kind = kind;
	}
	// get publics
	private ArrayList<Options> getPublics(String name, File file) throws FileNotFoundException {
		Scanner sc = new Scanner(file);
		ArrayList<Options> list = new ArrayList<Options>();
		
		boolean thisKind = false;
		boolean flagPublic = true;
		boolean flagPublishedProp = false;
		boolean flagAnotation = false;
		while(sc.hasNext()){
			String line = sc.nextLine();
			if(line.contains("/**")){
				flagAnotation = true;
			}
			if((line.contains("});") && Utils.getCountString(line, "\t") == 0) || line.contains("enyo.kind({")){
				thisKind = false;
			}
			if((line.contains("@protected") || line.contains("@private")) && Utils.getCountString(line, "\t") == 1){
				flagPublic = false;
			}
			if(flagPublishedProp && line.contains("},") && Utils.getCountString(line, "\t") == 1){
				flagPublishedProp = false;
			}
			
			// Function
			if(!flagAnotation && thisKind && flagPublic && line.contains(":") && line.contains("function") && Utils.getCountString(line, "\t") == 1){
//					System.out.println(line.trim().substring(0,line.trim().indexOf(":")) + "  #########  " + this.name);
				Options entity = new Options(line.trim().substring(0,line.trim().indexOf(":")),"function");
				list.add(entity);
			}
			// Published Property
			if(!flagAnotation && thisKind && flagPublic && flagPublishedProp && line.contains(":") && Utils.getCountString(line, "\t") == 2 && !(line.trim().subSequence(0, 2).equals("//"))){
				Options entity = new Options(line.trim().substring(0,line.trim().indexOf(":")),"published");
				String defaultValue = line.trim().substring(line.trim().indexOf(":")+1).trim();
				if(defaultValue.contains("//")){
					defaultValue = defaultValue.substring(0,defaultValue.lastIndexOf("//")).trim();
				}
				if(defaultValue.endsWith(",")){
					defaultValue = defaultValue.substring(0,defaultValue.length()-1);
				}
//				System.out.print(line.trim().substring(0,line.trim().indexOf(":")));
//				System.out.println(": " + defaultValue);
				entity.setDefaultValue(defaultValue);
				list.add(entity);
			}
			// Public Property
			if(!flagAnotation && thisKind && flagPublic && line.contains(":") && !line.contains("function") && Utils.getCountString(line, "\t") == 1 && !line.contains("published: {") && !line.contains("events: {") && !line.contains("kind: ") && !line.contains("handlers: ") && !line.contains("classes: ")){
				Options entity = new Options(line.trim().substring(0,line.trim().indexOf(":")),"public");
				String defaultValue = line.trim().substring(line.trim().indexOf(":")+1).trim();
				if(defaultValue.contains("//")){
					defaultValue = defaultValue.substring(0,defaultValue.lastIndexOf("//")).trim();
				}
				if(defaultValue.endsWith(",")){
					defaultValue = defaultValue.substring(0,defaultValue.length()-1);
				}
				entity.setDefaultValue(defaultValue);
				list.add(entity);
			}
			
			if(line.contains("published:") && Utils.getCountString(line, "\t") == 1){
				flagPublishedProp = true;
			}
			if(line.contains("@public") && Utils.getCountString(line, "\t") == 1){
				flagPublic = true;
			}
			if(line.contains(name+"\"") && line.contains("name:") && Utils.getCountString(line, "\t") == 1){
				thisKind = true;
			}
			if(flagAnotation && line.contains("*/")){
				flagAnotation = false;
			}
		}
		return list;
	}
		
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ArrayList<Options> getPublics() {
		return publics;
	}
	public void setPublics(ArrayList<Options> publics) {
		this.publics = publics;
	}
	public ArrayList<Options> getProtecteds() {
		return protecteds;
	}
	public void setProtecteds(ArrayList<Options> protecteds) {
		this.protecteds = protecteds;
	}
	public ArrayList<Options> getPrivates() {
		return privates;
	}
	public void setPrivates(ArrayList<Options> privates) {
		this.privates = privates;
	}
}