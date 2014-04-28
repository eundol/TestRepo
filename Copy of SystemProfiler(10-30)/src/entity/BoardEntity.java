package entity;

public class BoardEntity {

	private int id;
	private String content;
	private String name;
	private String pwd;
	private String created;

	public BoardEntity() {
		super();
	}

	public BoardEntity(int id, String content, String name, String pwd,
			String created) {
		super();
		this.id = id;
		this.content = content;
		this.name = name;
		this.pwd = pwd;
		this.created = created;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

}
