package entity;

/*
 * class name: IoEntity
 * description: I/O관련 정보를 저장하는 기본 포맷, iostat 결과를 담고 있음(entity)
 */
public class IoEntity {

	private String id;
	private String sequence;
	private String device;
	private String tps;
	private String read_s;
	private String wrtn_s;
	private String read;
	private String wrtn;
	
	private String user;
	private String nice;
	private String system;
	private String iowait;
	private String steal;
	private String idle;

	public IoEntity() {
		super();
	}

	public IoEntity(String id, String sequence, String device, String tps,
			String read_s, String wrtn_s, String read, String wrtn) {
		super();
		this.id = id;
		this.sequence = sequence;
		this.device = device;
		this.tps = tps;
		this.read_s = read_s;
		this.wrtn_s = wrtn_s;
		this.read = read;
		this.wrtn = wrtn;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public String getTps() {
		return tps;
	}

	public void setTps(String tps) {
		this.tps = tps;
	}

	public String getRead_s() {
		return read_s;
	}

	public void setRead_s(String read_s) {
		this.read_s = read_s;
	}

	public String getWrtn_s() {
		return wrtn_s;
	}

	public void setWrtn_s(String wrtn_s) {
		this.wrtn_s = wrtn_s;
	}

	public String getRead() {
		return read;
	}

	public void setRead(String read) {
		this.read = read;
	}

	public String getWrtn() {
		return wrtn;
	}

	public void setWrtn(String wrtn) {
		this.wrtn = wrtn;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getNice() {
		return nice;
	}

	public void setNice(String nice) {
		this.nice = nice;
	}

	public String getSystem() {
		return system;
	}

	public void setSystem(String system) {
		this.system = system;
	}

	public String getIowait() {
		return iowait;
	}

	public void setIowait(String iowait) {
		this.iowait = iowait;
	}

	public String getSteal() {
		return steal;
	}

	public void setSteal(String steal) {
		this.steal = steal;
	}

	public String getIdle() {
		return idle;
	}

	public void setIdle(String idle) {
		this.idle = idle;
	}
	
	

}
