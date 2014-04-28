package entity;

public class IotopEntity {

	private String profile_id;
	private int sequence;
	private int pid;
	private String prio;
	private String user;
	private int read;
	private int readGap;
	private int write;
	private int writeGap;
	private String swapin;
	private String io;
	private String command;
	private String commandTrimed;
	
	public IotopEntity() {
		super();
	}
	
	public IotopEntity(String profile_id, int sequence, int pid, String prio,
			String user, int read, int write, String swapin, String io,
			String command) {
		super();
		this.profile_id = profile_id;
		this.sequence = sequence;
		this.pid = pid;
		this.prio = prio;
		this.user = user;
		this.read = read;
		this.write = write;
		this.swapin = swapin;
		this.io = io;
		this.command = command;
	}
	
	public int getReadGap() {
		return readGap;
	}

	public void setReadGap(int readGap) {
		this.readGap = readGap;
	}

	public int getWriteGap() {
		return writeGap;
	}

	public void setWriteGap(int writeGap) {
		this.writeGap = writeGap;
	}

	public String getCommandTrimed() {
		return commandTrimed;
	}

	public void setCommandTrimed(String commandTrimed) {
		this.commandTrimed = commandTrimed;
	}

	public String getProfile_id() {
		return profile_id;
	}
	public void setProfile_id(String profile_id) {
		this.profile_id = profile_id;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPrio() {
		return prio;
	}
	public void setPrio(String prio) {
		this.prio = prio;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public int getRead() {
		return read;
	}
	public void setRead(int read) {
		this.read = read;
	}
	public int getWrite() {
		return write;
	}
	public void setWrite(int write) {
		this.write = write;
	}
	public String getSwapin() {
		return swapin;
	}
	public void setSwapin(String swapin) {
		this.swapin = swapin;
	}
	public String getIo() {
		return io;
	}
	public void setIo(String io) {
		this.io = io;
	}
	public String getCommand() {
		return command;
	}
	public void setCommand(String command) {
		this.command = command;
	}
	
	public void printContents(){
		System.out.println(profile_id + "\t" + sequence + "\t" + pid + "\t" + prio + "\t" + user + "\t" + read + "\t" + readGap + "\t" + write + "\t" + writeGap + "\t" + swapin + "\t" + io + "\t" + command);
	}
	
}
