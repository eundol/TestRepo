package enyotest;
public class EnyoTestEntity {
	
	private String name;
	private String version;
	private String start_time;
	private String time;
	private String api;
	private String test_case;
	private String result;
	private String description;
	private String duration;
	
	public EnyoTestEntity() {
		super();
	}
	public EnyoTestEntity(String name, String version, String start_time) {
		super();
		this.name = name;
		this.version = version;
		this.start_time = start_time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getApi() {
		return api;
	}
	public void setApi(String api) {
		this.api = api;
	}
	public String getTest_case() {
		return test_case;
	}
	public void setTest_case(String test_case) {
		this.test_case = test_case;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	
	
}
