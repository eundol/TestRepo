package common;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ProfileUtils {

	public String getUtcTimeFormat(String origin){
		
//		origin = origin.replace("-", ",");
//		origin = origin.replace(" ", ",");
//		origin = origin.replace(":", ",");
		
		String year = origin.substring(0, 4);
		String month = origin.substring(5, 7);
		String day = origin.substring(8, 10);
		String hour = origin.substring(11, 13);
		String minute = origin.substring(14, 16);
		String second = origin.substring(17, 19);
		
		return year+","+(Integer.parseInt(month)-1)+","+day+","+hour+","+minute+","+second;
	}
	
	public String addSecondTime(String origin, int second){
		
		String result = "";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
		
		try {
			result = df.format(df.parse(origin).getTime() + (1000 * second));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
}
