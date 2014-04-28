package entity;
	
public class DelayIssue {
	
	private String summary;
	private String issue_Key;
	private String priority;
	
	public DelayIssue(String summary, String issue_Key, String priority) {
		super();
		this.summary = summary;
		this.issue_Key = issue_Key;
		this.priority = priority;
	}

	public DelayIssue() {
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getIssue_Key() {
		return issue_Key;
	}

	public void setIssue_Key(String issue_Key) {
		this.issue_Key = issue_Key;
	}
	
	
	
	
}
