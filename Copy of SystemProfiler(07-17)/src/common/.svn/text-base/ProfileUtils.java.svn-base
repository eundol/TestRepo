package common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import entity.IoEntity;

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
	
	public String makeTraceGraphString(ArrayList<IoEntity> traceInfo, String value, String created){
		String createdUTC = getUtcTimeFormat(created);
		String result = "";
		
		IoEntity entity = null;
		if(value.equals("Used")){
			result += "{name:'Used',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getUsed() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		if(value.equals("User")){
			result += "{name:'User',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getUser() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		if(value.equals("Nice")){
			result += "{name:'Nice',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getNice() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		if(value.equals("System")){
			result += "{name:'System',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getSystem() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		if(value.equals("Iowait")){
			result += "{name:'Iowait',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getIowait() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		if(value.equals("Steal")){
			result += "{name:'Steal',data:[";
			for(int inx = 0, size = traceInfo.size() ; inx < size ; inx++){
				entity = traceInfo.get(inx);
				result += "[Date.UTC(" + createdUTC + ")," + entity.getSteal() + "],";
				created = addSecondTime(created, 1);
				createdUTC = getUtcTimeFormat(created);
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
			}
			result = finishResult(result);
		}
		
	return result;
	}

	private String finishResult(String result) {
		result += "]" +
				",dataLabels: {enabled: true,formatter:function(){return Highcharts.numberFormat(this.y,0)+'%';}" +
				",style: {color: '#333',fontWeight: 'bold',fontSize: '9px',fontFamily: 'Trebuchet MS, Verdana, sans-serif'}},"
				+ "animation: {duration: 2660}}";
		return result;
	}
}
