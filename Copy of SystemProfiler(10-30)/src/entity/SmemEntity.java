package entity;

public class SmemEntity {

	private String id;
	private String name;
	private long pssStart;
	private long pssEnd;
	private long pssDiff;
	private long ussStart;
	private long ussEnd;
	private long ussDiff;
	
	public SmemEntity() {
		super();
	}

	public SmemEntity(String id, String name, long pssStart, long pssEnd,
			long pssDiff, long ussStart, long ussEnd, long ussDiff) {
		super();
		this.id = id;
		this.name = name;
		this.pssStart = pssStart;
		this.pssEnd = pssEnd;
		this.pssDiff = pssDiff;
		this.ussStart = ussStart;
		this.ussEnd = ussEnd;
		this.ussDiff = ussDiff;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getPssStart() {
		return pssStart;
	}
	public void setPssStart(long pssStart) {
		this.pssStart = pssStart;
	}
	public long getPssEnd() {
		return pssEnd;
	}
	public void setPssEnd(long pssEnd) {
		this.pssEnd = pssEnd;
	}
	public long getPssDiff() {
		return pssDiff;
	}
	public void setPssDiff(long pssDiff) {
		this.pssDiff = pssDiff;
	}
	public long getUssStart() {
		return ussStart;
	}
	public void setUssStart(long ussStart) {
		this.ussStart = ussStart;
	}
	public long getUssEnd() {
		return ussEnd;
	}
	public void setUssEnd(long ussEnd) {
		this.ussEnd = ussEnd;
	}
	public long getUssDiff() {
		return ussDiff;
	}
	public void setUssDiff(long ussDiff) {
		this.ussDiff = ussDiff;
	}
	
}
