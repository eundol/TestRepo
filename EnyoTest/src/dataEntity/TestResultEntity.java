package dataEntity;

public class TestResultEntity {
	
	private String name;
	private String nameSort;
	private String version;
	private String start_time;
	private int api;
	private String api_name;
	private int test_case;
	private int pass;
	private int fail;
	private int error;
	private String duration;
	
	public TestResultEntity() {
		super();
	}

	public TestResultEntity(String name, String nameSort, String version,
			String start_time, String api_name, int test_case, int pass,
			int fail, int error, String duration) {
		super();
		this.name = name;
		this.nameSort = nameSort;
		this.version = version;
		this.start_time = start_time;
		this.api_name = api_name;
		this.test_case = test_case;
		this.pass = pass;
		this.fail = fail;
		this.error = error;
		this.duration = duration;
	}

	public TestResultEntity(String name, String nameSort, String version,
			String start_time, int api, int test_case, int pass, int fail,
			int error, String duration) {
		super();
		this.name = name;
		this.nameSort = nameSort;
		this.version = version;
		this.start_time = start_time;
		this.api = api;
		this.test_case = test_case;
		this.pass = pass;
		this.fail = fail;
		this.error = error;
		this.duration = duration;
	}

	public String getApi_name() {
		return api_name;
	}
	public void setApi_name(String api_name) {
		this.api_name = api_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNameSort() {
		return nameSort;
	}
	public void setNameSort(String nameSort) {
		this.nameSort = nameSort;
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
	public int getApi() {
		return api;
	}
	public void setApi(int api) {
		this.api = api;
	}
	public int getTest_case() {
		return test_case;
	}
	public void setTest_case(int test_case) {
		this.test_case = test_case;
	}
	public int getPass() {
		return pass;
	}
	public void setPass(int pass) {
		this.pass = pass;
	}
	public int getFail() {
		return fail;
	}
	public void setFail(int fail) {
		this.fail = fail;
	}
	public int getError() {
		return error;
	}
	public void setError(int error) {
		this.error = error;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
}