package entity;

public class PageOwnerEntity {
	
	private String id;
	private long sequence;
	private int num;
	private long time;
	private long order;
	private long pages;
	private long memory;
	private long pid;
	private String tid;
	private String process;
	private String cmd;
	private String type;
	private String keyword;
	private String callChain;
	private String module;
	private long kernel;
	private long user;
	private long total;
	
	public PageOwnerEntity() {
		super();
	}

	public String getCmd() {
		return cmd;
	}
	
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}

	public long getPages() {
		return pages;
	}

	public void setPages(long pages) {
		this.pages = pages;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public PageOwnerEntity(long kernel, long user, long total) {
		super();
		this.kernel = kernel;
		this.user = user;
		this.total = total;
	}
	
	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public long getKernel() {
		return kernel;
	}
	public void setKernel(long kernel) {
		this.kernel = kernel;
	}
	public long getUser() {
		return user;
	}
	public void setUser(long user) {
		this.user = user;
	}
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public long getSequence() {
		return sequence;
	}
	public void setSequence(long sequence) {
		this.sequence = sequence;
	}
	public long getTime() {
		return time;
	}
	public void setTime(long time) {
		this.time = time;
	}
	public long getOrder() {
		return order;
	}
	public void setOrder(long order) {
		this.order = order;
	}
	public long getMemory() {
		return memory;
	}
	public void setMemory(long memory) {
		this.memory = memory;
	}
	public long getPid() {
		return pid;
	}
	public void setPid(long pid) {
		this.pid = pid;
	}
	public String getProcess() {
		return process;
	}
	public void setProcess(String process) {
		this.process = process;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getCallChain() {
		return callChain;
	}
	public void setCallChain(String callChain) {
		this.callChain = callChain;
	}
}
