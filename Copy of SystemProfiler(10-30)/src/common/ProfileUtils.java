package common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import entity.IoEntity;
import entity.IotopEntity;

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
	
	public String addSecondTime(String origin, long second){
		
		String result = "";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
		
		try {
			result = df.format(df.parse(origin).getTime() + (1000 * (int)second));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public String makeTraceGraphString(ArrayList<IoEntity> traceInfo, String value, String created, boolean overThirty){
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
			result = finishResult(result, overThirty);
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
			result = finishResult(result, overThirty);
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
			result = finishResult(result, overThirty);
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
			result = finishResult(result, overThirty);
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
			result = finishResult(result, overThirty);
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
			result = finishResult(result, overThirty);
		}
		
	return result;
	}
	
	public String makeTraceGraphStringIO(ArrayList<IotopEntity> iotopInfoArranged, String value, String created, boolean overThirty, String option){
		String createdUTC = getUtcTimeFormat(created);
		String result = "";
		String timeTemp = null;
		
		IotopEntity entity = null;
		
			result += "{name:'" + value + "',data:[";
			for(int inx = 0, size = iotopInfoArranged.size() ; inx < size ; inx++){
				entity = iotopInfoArranged.get(inx);
				
				timeTemp = addSecondTime(created, entity.getSequence()-1);
				createdUTC = getUtcTimeFormat(timeTemp);
				
				if(entity.getCommand().equals(value)){
					
					if(option.equals("read")){
						result += "[Date.UTC(" + createdUTC + ")," + entity.getReadGap() + "],";
					}else{
						result += "[Date.UTC(" + createdUTC + ")," + entity.getWriteGap() + "],";
					}
				
				if(inx == size-1){
					result = result.substring(0, result.length()-1);
				}
				}
			}
			
			result = finishResultIo(result, overThirty);
		
		return result;
	}

	private String finishResult(String result, boolean overThirty) {
		if(overThirty){
			result += "]" +
					",dataLabels: {enabled: true,formatter:function(){return ;}" +
					",style: {color: '#333',fontWeight: 'bold',fontSize: '9px',fontFamily: 'Trebuchet MS, Verdana, sans-serif'}},"
					+ "animation: {duration: 2660}}";	
		}else{
			result += "]" +
					",dataLabels: {enabled: true,formatter:function(){if(Highcharts.numberFormat(this.y,0) >= 10){return Highcharts.numberFormat(this.y,0)+'%';}else{return;};}" +
					",style: {color: '#333',fontWeight: 'bold',fontSize: '9px',fontFamily: 'Trebuchet MS, Verdana, sans-serif'}},"
					+ "animation: {duration: 2660}}";
		}
		return result;
	}
	private String finishResultIo(String result, boolean overThirty) {
		result += "]" +
				",dataLabels: {enabled: true, formatter:function(){if(this.y>10240){return Highcharts.numberFormat(this.y/1024,0) + 'MB'}else{return this.y + 'KB'};}" +
				",style: {color: '#333',fontWeight: 'bold',fontSize: '9px',fontFamily: 'Trebuchet MS, Verdana, sans-serif'}},"
				+ "animation: {duration: 2960}}";	
		return result;
	}
	
	public String zeroToDashMark(String input){
		String result = input;
		if(input.equals("0")){
			result = "-";
		}else{
			result += " KB";
		}
		return result;
	}
	
	public String changeColorBlueOrRed(String input){
		String result = input;
		if(!result.equals("0")){
			if(result.contains("-")){
				result = "<span style=\"color:blue\">" + input + " KB</span>";
			}else{
				result = "<span style=\"color:red\">+" + input + " KB</span>";
			}
		}else{
			result = input + " KB";
		}
		return result;
	}
	
	public String addPlusMark(String input){
		String result = input;
		if(!result.equals("0")){
			if(result.contains("-")){
				result = input;
			}else{
				result = "+" + input;
			}
		}
		return result;
	}
	
}
