package garnetApi;

import java.io.File;

public class GarnetApi {

	public static String version;
	
	protected String name;
	protected File file;
	
	public GarnetApi(String name, File file) {
		super();
		this.name = name;
		this.file = file;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		GarnetApi.version = version;
	}
}
