package entity;

public class PerfInfo {

	private String image_name;
	private String section;
	private String detail;
	private String duration;
	
	public PerfInfo(String image_name, String section, String detail, String duration) {
		this.image_name = image_name;
		this.section = section;
		this.detail = detail;
		this.duration = duration;
	}
	
	public String getImage_name() {
		return image_name;
	}
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	
	
	
}
