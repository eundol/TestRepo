package entity;

public class StaticDencityInfo {

	private String date;
	private double dencity;
	private int highDefect;
	private int mediumDefect;
	
	public StaticDencityInfo() {
		super();
	}
	
	public StaticDencityInfo(String date, double dencity) {
		super();
		this.date = date;
		this.dencity = dencity;
	}
	
	public StaticDencityInfo(String date, int highDefect, int mediumDefect) {
		super();
		this.date = date;
		this.highDefect = highDefect;
		this.mediumDefect = mediumDefect;
	}

	public StaticDencityInfo(String date, String type, int count) {
		super();
		this.date = date;
	}

	public int getHighDefect() {
		return highDefect;
	}

	public void setHighDefect(int highDefect) {
		this.highDefect = highDefect;
	}

	public int getMediumDefect() {
		return mediumDefect;
	}

	public void setMediumDefect(int mediumDefect) {
		this.mediumDefect = mediumDefect;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public double getDencity() {
		return dencity;
	}
	public void setDencity(double dencity) {
		this.dencity = dencity;
	}
}
