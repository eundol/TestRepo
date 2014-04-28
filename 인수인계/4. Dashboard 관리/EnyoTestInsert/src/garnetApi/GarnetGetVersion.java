package garnetApi;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;


/**
 * Garnet Api 정보를 담고 있는 클래스 <p>
 * @author heesung.eun
 */
public class GarnetGetVersion {

	public String garnetVersion;
	
	public GarnetGetVersion(String path) throws FileNotFoundException {
		
		File file = new File(path + "/version.js");
		Scanner sc = new Scanner(file);
		String line = "";
		
		while (sc.hasNextLine()) {
			line = sc.nextLine();
			if(line.contains("enyo.version.garnet")){
				break;
			}
		}
		
		garnetVersion = line.substring(line.indexOf("\"")+1,line.lastIndexOf("\""));
		System.out.println("Garnet Version : " + garnetVersion);
		
	}
}
