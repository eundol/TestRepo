package entity;

public class TableRanking {

	private String[] projectName;
	private int[] columnData;
	
	/* ****** Constructor ****** */
	public TableRanking() {
		
	}
	
	public TableRanking(String[] projectName, int[] columnData){
		super();
		this.projectName = projectName;
		this.columnData = columnData;
	}
	
	/* ****** method ****** */
	public String[] getProjectName()
	{
		return projectName;
	}
	
	public int[] getColumnData()
	{
		return columnData;
	}
}
